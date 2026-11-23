import { randomUUID } from 'node:crypto';
import { MongoDBContainer } from '@testcontainers/mongodb';

export async function startMongoTestContainer() {
  const container = await new MongoDBContainer('mongo:7.0.16').start();

  try {
    const databaseName = `codask_it_${randomUUID().replace(/-/g, '')}`;
    const uri = new URL(container.getConnectionString());
    uri.pathname = `/${databaseName}`;
    uri.searchParams.set('directConnection', 'true');

    return {
      databaseName,
      uri: uri.toString(),
      async stop(): Promise<void> {
        await container.stop();
      },
    };
  } catch (error) {
    try {
      await container.stop();
    } catch (stopError) {
      throw new AggregateError(
        [error, stopError],
        'Failed to configure and stop the MongoDB test container',
      );
    }
    throw error;
  }
}
