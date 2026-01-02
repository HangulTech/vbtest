import { Module } from 'src/admin/node_modules/@nestjs/common';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController]
})
export class HealthModule {}
