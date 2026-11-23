import request from 'supertest';
import { STATES } from 'mongoose';
import { IntegrationTestSetup } from '../test/integration-test-setup';
import { sampleData, sampleIds } from '../test/fixtures/sample-data';

describe('Integration test setup', () => {
  let setup: IntegrationTestSetup;

  beforeAll(async () => {
    setup = await IntegrationTestSetup.create();
  });

  beforeEach(async () => {
    await setup.seedDatabase();
  });

  afterEach(async () => {
    await setup?.cleanDatabase();
  });

  afterAll(async () => {
    await setup?.close();
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
});

it('restores the environment and disconnects MongoDB after closing', async () => {
  const originalEnvironment = { ...process.env };
  process.env.MONGO_URI = 'mongodb://example.invalid/never-use-this';
  try {
    const setup = await IntegrationTestSetup.create();
    const connection = setup.getConnection();
    try {
      await setup.close();
      expect(connection.readyState).toBe(STATES.disconnected);
      expect(process.env.MONGO_URI).toBe(
        'mongodb://example.invalid/never-use-this',
      );
      expect(process.env.PORT).toBe(originalEnvironment.PORT);
      expect(process.env.ACCESS_TOKEN_SECRET).toBe(
        originalEnvironment.ACCESS_TOKEN_SECRET,
      );
      expect(process.env.DOMAIN_NAME).toBe(originalEnvironment.DOMAIN_NAME);
    } finally {
      await setup.close();
    }
  } finally {
    if (originalEnvironment.MONGO_URI === undefined) {
      delete process.env.MONGO_URI;
    } else {
      process.env.MONGO_URI = originalEnvironment.MONGO_URI;
    }
  }
});
