import mongoose, { Connection } from 'mongoose';
import { startMongoTestContainer } from '../test/mongodb-test-container';

describe('MongoDB test container', () => {
  let container:
    | Awaited<ReturnType<typeof startMongoTestContainer>>
    | undefined;
  let connection: Connection | undefined;

  beforeAll(async () => {
    container = await startMongoTestContainer();
    connection = mongoose.createConnection(container.uri, {
      writeConcern: { w: 'majority', j: true },
      readPreference: 'primaryPreferred',
      retryWrites: true,
      retryReads: true,
    });
    await connection.asPromise();
  }, 180_000);

  afterAll(async () => {
    try {
      await connection?.close();
    } finally {
      await container?.stop();
    }
  }, 180_000);

  it('connects to an isolated database and supports the app write concern', async () => {
    if (!connection?.db || !container) {
      throw new Error('MongoDB test connection was not initialized');
    }

    expect(connection.name).toBe(container.databaseName);
    await connection.db
      .collection('test_records')
      .insertOne({ value: 'sample' });
    expect(
      await connection.db.collection('test_records').countDocuments(),
    ).toBe(1);

    const otherContainer = await startMongoTestContainer();
    try {
      expect(otherContainer.databaseName).not.toBe(container.databaseName);
      expect(new URL(otherContainer.uri).host).not.toBe(
        new URL(container.uri).host,
      );
      const otherConnection = mongoose.createConnection(otherContainer.uri);
      try {
        await otherConnection.asPromise();
        if (!otherConnection.db) {
          throw new Error('Second MongoDB test connection was not initialized');
        }
        expect(
          await otherConnection.db.collection('test_records').countDocuments(),
        ).toBe(0);
      } finally {
        await otherConnection.close();
      }
    } finally {
      await otherContainer.stop();
    }
  }, 180_000);
});
