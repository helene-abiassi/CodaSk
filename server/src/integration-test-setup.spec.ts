import { Test } from '@nestjs/testing';
import { IntegrationTestSetup } from '../test/integration-test-setup';
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
});
