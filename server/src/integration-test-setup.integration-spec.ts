import request from 'supertest';
import mongoose, { STATES } from 'mongoose';
import { IntegrationTestSetup } from '../test/integration-test-setup';
import { sampleData, sampleIds } from '../test/fixtures/sample-data';

let firstDatabaseName: string;
let firstSetup: IntegrationTestSetup;

describe('Integration test setup', () => {
  let setup: IntegrationTestSetup;
  let previousMongoUri: string | undefined;

  beforeAll(async () => {
    previousMongoUri = process.env.MONGO_URI;
    process.env.MONGO_URI = 'mongodb://example.invalid/never-use-this';
    setup = await IntegrationTestSetup.create();
    firstSetup = setup;
    firstDatabaseName = setup.getConnection().name;
  });

  beforeEach(async () => {
    await setup.seedDatabase();
  });

  afterEach(async () => {
    await setup?.cleanDatabase();
  });

  afterAll(async () => {
    try {
      const connection = setup?.getConnection();
      await setup?.close();
      if (connection) {
        expect(connection.readyState).toBe(STATES.disconnected);
      }
      expect(process.env.MONGO_URI).toBe(
        'mongodb://example.invalid/never-use-this',
      );
    } finally {
      if (previousMongoUri === undefined) {
        delete process.env.MONGO_URI;
      } else {
        process.env.MONGO_URI = previousMongoUri;
      }
    }
  });

  it('authenticates a fixture user with a bearer token or cookie', async () => {
    const authorization = await setup.createAuthorizationHeader(
      sampleIds.author.toHexString(),
    );
    const server = setup.getHttpServer();

    await request(server).get('/auth/profile').expect(401);
    await request(server)
      .get('/auth/profile')
      .set('Authorization', 'Bearer invalid')
      .expect(401);
    const response = await request(server)
      .get('/auth/profile')
      .set('Authorization', authorization)
      .expect(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: sampleIds.author.toHexString(),
        email: sampleData.users[0].email,
      }),
    );
    expect(response.body).not.toHaveProperty('password');
    await request(server)
      .get('/auth/profile')
      .set('Cookie', `accessToken=${authorization.slice('Bearer '.length)}`)
      .expect(200);
  });

  it('rejects overlapping setups in the same test file', async () => {
    await expect(IntegrationTestSetup.create()).rejects.toThrow(
      'Only one integration test setup can run in a test file',
    );
  });

  it('cleans all application collections without dropping indexes and allows reseeding', async () => {
    const db = setup.getConnection().db;
    if (!db) {
      throw new Error('Integration test database is not connected');
    }
    const extra = db.collection('extra_test_records');
    await extra.createIndex({ value: 1 }, { name: 'value_index' });
    await extra.insertOne({ value: 'sample' });

    await setup.cleanDatabase();
    for (const collection of await db.collections()) {
      if (!collection.collectionName.startsWith('system.')) {
        expect(await collection.countDocuments()).toBe(0);
      }
    }
    expect(await extra.indexExists('value_index')).toBe(true);

    await setup.seedDatabase();
    expect(await db.collection('questions').countDocuments()).toBe(
      sampleData.questions.length,
    );
  });

  it.each([
    ['name', 'unexpected_database'],
    ['host', 'unexpected-host'],
    ['port', 1],
  ] as const)(
    'refuses to seed or clean when the connection %s changes',
    async (property, value) => {
      const connection = setup.getConnection();
      const replaced = jest.replaceProperty(connection, property, value);
      try {
        await expect(setup.cleanDatabase()).rejects.toThrow(
          'Refusing to use an unexpected integration test database',
        );
        await expect(setup.seedDatabase()).rejects.toThrow(
          'Refusing to use an unexpected integration test database',
        );
      } finally {
        replaced.restore();
      }
      expect(
        await connection.db?.collection('questions').countDocuments(),
      ).toBe(sampleData.questions.length);
    },
  );

  it('refuses to seed or clean a disconnected database', async () => {
    const connection = setup.getConnection();
    const disconnected = mongoose.createConnection();
    const getConnection = jest
      .spyOn(setup, 'getConnection')
      .mockReturnValue(disconnected);
    try {
      await expect(setup.cleanDatabase()).rejects.toThrow(
        'Refusing to use an unexpected integration test database',
      );
      await expect(setup.seedDatabase()).rejects.toThrow(
        'Refusing to use an unexpected integration test database',
      );
    } finally {
      getConnection.mockRestore();
      await disconnected.close();
    }
    expect(await connection.db?.collection('questions').countDocuments()).toBe(
      sampleData.questions.length,
    );
  });
});

it('can start a fresh setup after teardown in the same process', async () => {
  const setup = await IntegrationTestSetup.create();
  try {
    await firstSetup.close();
    await expect(IntegrationTestSetup.create()).rejects.toThrow(
      'Only one integration test setup can run in a test file',
    );
    expect(setup.getConnection().name).not.toBe(firstDatabaseName);
    await setup.seedDatabase();
    const header = await setup.createAuthorizationHeader(
      sampleIds.author.toHexString(),
    );
    await request(setup.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', header)
      .expect(200);
  } finally {
    await setup.close();
  }
});
