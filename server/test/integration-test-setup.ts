import { Server } from 'node:http';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import { Connection, STATES } from 'mongoose';
import type { AppModule as AppModuleType } from '../src/app.module';
import { seedSampleData } from './fixtures/seed-sample-data';
import { startMongoTestContainer } from './mongodb-test-container';

type TestContainer = Awaited<ReturnType<typeof startMongoTestContainer>>;

export class IntegrationTestSetup {
  private static active = false;
  private app?: INestApplication;
  private module?: TestingModule;
  private container?: TestContainer;
  private originalEnvironment?: NodeJS.ProcessEnv;
  private readonly environmentKeys = new Set<string>();
  private ownsSlot = true;

  private constructor() {}

  static async create(): Promise<IntegrationTestSetup> {
    if (IntegrationTestSetup.active) {
      throw new Error('Only one integration test setup can run in a process');
    }
    IntegrationTestSetup.active = true;
    const setup = new IntegrationTestSetup();
    try {
      await setup.init();
      return setup;
    } catch (error) {
      try {
        await setup.close();
      } catch (cleanupError) {
        throw new AggregateError(
          [error, cleanupError],
          'Failed to initialize and clean up the integration test setup',
        );
      }
      throw error;
    }
  }

  private async init(): Promise<void> {
    this.container = await startMongoTestContainer();
    this.originalEnvironment = { ...process.env };
    const testEnvironment = {
      PORT: '5000',
      MONGO_URI: this.container.uri,
      CORS_ORIGINS: 'http://localhost:5173',
      ACCESS_TOKEN_SECRET: 'integration-test-access-secret',
      ACCESS_TOKEN_EXPIRY: '15m',
      REFRESH_TOKEN_SECRET: 'integration-test-refresh-secret',
      REFRESH_TOKEN_EXPIRY: '7d',
      DOMAIN_NAME: '',
    };

    for (const [key, value] of Object.entries(testEnvironment)) {
      this.environmentKeys.add(key);
      process.env[key] = value;
    }

    try {
      // Defer loading until test configuration is set; Jest runs this project as CommonJS.
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { AppModule } = require('../src/app.module') as {
        AppModule: typeof AppModuleType;
      };
      this.module = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
    } finally {
      for (const key of Object.keys(process.env)) {
        if (!(key in this.originalEnvironment)) {
          this.environmentKeys.add(key);
        }
      }
    }

    this.app = this.module.createNestApplication();
    this.app.useGlobalPipes(new ValidationPipe());
    this.app.use(cookieParser());
    await this.app.init();
    this.getConnection();
  }

  getApp(): INestApplication {
    if (!this.app) {
      throw new Error('Integration test application is not initialized');
    }
    return this.app;
  }

  getHttpServer(): Server {
    return this.getApp().getHttpServer() as Server;
  }

  getConnection(): Connection {
    const connection = this.getApp().get<Connection>(getConnectionToken());
    const uri = this.container && new URL(this.container.uri);
    if (
      !this.container ||
      !uri ||
      connection.readyState !== STATES.connected ||
      connection.name !== this.container.databaseName ||
      connection.host !== uri.hostname ||
      connection.port !== Number(uri.port) ||
      !connection.db
    ) {
      throw new Error(
        'Refusing to use an unexpected integration test database',
      );
    }
    return connection;
  }

  async createAuthorizationHeader(userId: string): Promise<string> {
    const app = this.getApp();
    const config = app.get(ConfigService);
    const secret = config.getOrThrow<string>('auth.accessToken.secret');
    const expiresIn = config.getOrThrow<
      NonNullable<JwtSignOptions['expiresIn']>
    >('auth.accessToken.expiresIn');
    const token = await app
      .get(JwtService)
      .signAsync({ sub: userId }, { secret, expiresIn });
    return `Bearer ${token}`;
  }

  async seedDatabase(): Promise<void> {
    await seedSampleData(this.getConnection());
  }

  async cleanDatabase(): Promise<void> {
    const db = this.getConnection().db;
    if (!db) {
      throw new Error('Integration test database is not connected');
    }
    const collections = await db.collections();
    for (const collection of collections) {
      if (!collection.collectionName.startsWith('system.')) {
        await collection.deleteMany({});
      }
    }
  }

  async close(): Promise<void> {
    const errors: unknown[] = [];
    try {
      if (this.app) {
        await this.app.close();
      } else {
        await this.module?.close();
      }
    } catch (error) {
      errors.push(error);
    }
    this.app = undefined;
    this.module = undefined;

    try {
      await this.container?.stop();
      this.container = undefined;
    } catch (error) {
      errors.push(error);
    } finally {
      if (this.originalEnvironment) {
        for (const key of this.environmentKeys) {
          const value = this.originalEnvironment[key];
          if (value === undefined) {
            delete process.env[key];
          } else {
            process.env[key] = value;
          }
        }
      }
      this.originalEnvironment = undefined;
      this.environmentKeys.clear();
      if (this.ownsSlot) {
        IntegrationTestSetup.active = false;
        this.ownsSlot = false;
      }
    }

    if (errors.length > 0) {
      throw new AggregateError(
        errors,
        'Failed to close integration test setup',
      );
    }
  }
}
