import { Module } from 'src/admin/node_modules/@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';

@Module({
  providers: [TrackingService],
  controllers: [TrackingController]
})
export class TrackingModule {}
