import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

const fields = {
  POSTGRES_HOST: { required: true },
  POSTGRES_PORT: { required: true },
  POSTGRES_USER: { required: true },
  POSTGRES_PASSWORD: { required: true },
  POSTGRES_DB: { required: true },
  POSTGRES_SCHEMA: { required: true },
  ADMIN_POSTGRES_USER: { required: true },
  ADMIN_POSTGRES_PASSWORD: { required: true },
};

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    if (process.env.NODE_ENV !== 'production') {
      dotenv.config();
    }

    const missingFields = Object.keys(fields).filter((field) => {
      return fields[field].required && typeof process.env[field] === 'undefined';
    });

    if (missingFields.length) {
      throw new Error(`ConfigService has missing fields: ${missingFields}`);
    }

    this.envConfig = process.env;
  }

  public get(key: string): string {
    const value = this.getOrDefault(key);

    if (!fields[key]) {
      throw new Error(`Environment variable '${key}' is not described in fields`);
    }

    return value;
  }

  public getConnectionsOptions({
    addMigrationProperties,
    useAdminUser,
  }: {
    addMigrationProperties?: boolean;
    useAdminUser?: boolean;
  } = {}): ConnectionOptions {
    const MIGRATIONS_DIR = 'src/migrations/**/*.ts';
    const ENTITIES_GLOB = __dirname + '/**/*.entity{.ts,.js}';

    let migrationsConfig = {};
    if (addMigrationProperties) {
      migrationsConfig = {
        migrations: ['src/migrations/**/*.ts'],
        cli: {
          migrationsDir: MIGRATIONS_DIR,
        },
      };
    }

    let username = this.get('POSTGRES_USER');
    let password = this.get('POSTGRES_PASSWORD');

    if (useAdminUser) {
      username = this.get('ADMIN_POSTGRES_USER');
      password = this.get('ADMIN_POSTGRES_PASSWORD');
    }

    return {
      type: 'postgres',
      host: this.get('POSTGRES_HOST'),
      port: Number(this.get('POSTGRES_PORT')),
      username,
      password,
      database: this.get('POSTGRES_DB'),
      schema: this.get('POSTGRES_SCHEMA'),
      entities: [ENTITIES_GLOB],
      ...migrationsConfig,
    };
  }

  private getOrDefault(key: string, defaultValue: string = null): string {
    return this.envConfig[key] || defaultValue;
  }
}
