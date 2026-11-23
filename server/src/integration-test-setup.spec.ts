import { Test } from '@nestjs/testing';
import { IntegrationTestSetup } from '../test/integration-test-setup';
import { IntegrationTestEnvironment } from '../test/integration-test-environment';
import * as mongoContainer from '../test/mongodb-test-container';

describe('Integration test setup startup failure', () => {
  let originalMongoUri: string | undefined;

  beforeEach(() => {
    originalMongoUri = process.env.MONGO_URI;
    process.env.MONGO_URI = 'mongodb://example.invalid/original';
    jest.spyOn(Test, 'createTestingModule').mockImplementation(() => {
      throw new Error('compilation failed');
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    if (originalMongoUri === undefined) {
      delete process.env.MONGO_URI;
    } else {
      process.env.MONGO_URI = originalMongoUri;
    }
  });

  it('stops the container and restores the original environment', async () => {
    const stop = jest.fn().mockResolvedValue(undefined);
    jest.spyOn(mongoContainer, 'startMongoTestContainer').mockResolvedValue({
      databaseName: 'codask_it_test',
      uri: 'mongodb://localhost:27017/codask_it_test?directConnection=true',
      stop,
    });
    const previousSecret = process.env.ACCESS_TOKEN_SECRET;

    await expect(IntegrationTestSetup.create()).rejects.toThrow(
      'compilation failed',
    );
    expect(stop).toHaveBeenCalledTimes(1);
    expect(process.env.MONGO_URI).toBe('mongodb://example.invalid/original');
    expect(process.env.ACCESS_TOKEN_SECRET).toBe(previousSecret);
  });

  it('reports both startup and cleanup errors', async () => {
    const stop = jest.fn().mockRejectedValue(new Error('stop failed'));
    jest.spyOn(mongoContainer, 'startMongoTestContainer').mockResolvedValue({
      databaseName: 'codask_it_test',
      uri: 'mongodb://localhost:27017/codask_it_test?directConnection=true',
      stop,
    });

    const failure = await IntegrationTestSetup.create().catch(
      (error: unknown) => error,
    );
    expect(failure).toBeInstanceOf(AggregateError);
    expect((failure as AggregateError).errors).toEqual([
      expect.objectContaining({ message: 'compilation failed' }),
      expect.objectContaining({ message: 'stop failed' }),
    ]);
    expect(process.env.MONGO_URI).toBe('mongodb://example.invalid/original');
  });
});

describe('Integration test environment', () => {
  it('restores overwritten and newly introduced variables', () => {
    const keys = ['MONGO_URI', 'DOMAIN_NAME', 'CODASK_TEST_ADDED'];
    const original = Object.fromEntries(
      keys.map((key) => [key, process.env[key]]),
    );
    process.env.MONGO_URI = 'mongodb://example.invalid/original';
    delete process.env.DOMAIN_NAME;
    delete process.env.CODASK_TEST_ADDED;
    const environment = new IntegrationTestEnvironment();

    try {
      environment.apply('mongodb://localhost/test');
      expect(process.env.MONGO_URI).toBe('mongodb://localhost/test');
      expect(process.env.DOMAIN_NAME).toBe('');
      process.env.CODASK_TEST_ADDED = 'introduced';
      environment.captureAddedVariables();
      environment.restore();

      expect(process.env.MONGO_URI).toBe('mongodb://example.invalid/original');
      expect(process.env.DOMAIN_NAME).toBeUndefined();
      expect(process.env.CODASK_TEST_ADDED).toBeUndefined();
    } finally {
      environment.restore();
      for (const key of keys) {
        const value = original[key];
        if (value === undefined) {
          delete process.env[key];
        } else {
          process.env[key] = value;
        }
      }
    }
  });
});

describe('Integration test setup partial initialization', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('reports initialization, app shutdown and container shutdown failures', async () => {
    const builder = Test.createTestingModule({});
    const module = await builder.compile();
    const app = module.createNestApplication();
    jest
      .spyOn(app, 'init')
      .mockRejectedValue(new Error('initialization failed'));
    jest
      .spyOn(app, 'close')
      .mockRejectedValue(new Error('app shutdown failed'));
    jest.spyOn(module, 'createNestApplication').mockReturnValue(app);
    jest.spyOn(builder, 'compile').mockResolvedValue(module);
    jest.spyOn(Test, 'createTestingModule').mockReturnValue(builder);
    const stop = jest
      .fn()
      .mockRejectedValue(new Error('container stop failed'));
    jest.spyOn(mongoContainer, 'startMongoTestContainer').mockResolvedValue({
      databaseName: 'codask_it_test',
      uri: 'mongodb://localhost:27017/codask_it_test?directConnection=true',
      stop,
    });
    const originalUri = process.env.MONGO_URI;

    try {
      const failure = await IntegrationTestSetup.create().catch(
        (error: unknown) => error,
      );
      expect(failure).toBeInstanceOf(AggregateError);
      const errors = (failure as AggregateError).errors;
      expect(errors[0]).toEqual(
        expect.objectContaining({ message: 'initialization failed' }),
      );
      expect(errors[1]).toBeInstanceOf(AggregateError);
      expect((errors[1] as AggregateError).errors).toEqual([
        expect.objectContaining({ message: 'app shutdown failed' }),
        expect.objectContaining({ message: 'container stop failed' }),
      ]);
      expect(stop).toHaveBeenCalledTimes(1);
      expect(process.env.MONGO_URI).toBe(originalUri);
    } finally {
      jest.restoreAllMocks();
      await app.close();
    }
  });
});
