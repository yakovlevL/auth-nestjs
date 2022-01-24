import { ConnectionOptions } from 'typeorm';
import { ConfigService } from './config.service';

const configService = new ConfigService();

const config: ConnectionOptions = configService.getConnectionsOptions({
  addMigrationProperties: true,
  useAdminUser: true,
});

export = config;
