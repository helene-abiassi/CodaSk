const testConfiguration = {
  PORT: '5000',
  CORS_ORIGINS: 'http://localhost:5173',
  ACCESS_TOKEN_SECRET: 'integration-test-access-secret',
  ACCESS_TOKEN_EXPIRY: '15m',
  REFRESH_TOKEN_SECRET: 'integration-test-refresh-secret',
  REFRESH_TOKEN_EXPIRY: '7d',
  DOMAIN_NAME: '',
} satisfies NodeJS.ProcessEnv;

export class IntegrationTestEnvironment {
  private readonly original = { ...process.env };
  private readonly changedKeys = new Set<string>();

  apply(mongoUri: string): void {
    for (const [key, value] of Object.entries({
      ...testConfiguration,
      MONGO_URI: mongoUri,
    })) {
      this.changedKeys.add(key);
      process.env[key] = value;
    }
  }

  captureAddedVariables(): void {
    for (const key of Object.keys(process.env)) {
      if (!(key in this.original)) {
        this.changedKeys.add(key);
      }
    }
  }

  restore(): void {
    for (const key of this.changedKeys) {
      const value = this.original[key];
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
    this.changedKeys.clear();
  }
}
