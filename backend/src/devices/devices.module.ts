import { Module } from 'src/admin/node_modules/@nestjs/common';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { AttendanceModule } from '../attendance/attendance.module';

@Module({
  imports: [AttendanceModule],
  controllers: [DevicesController],
  providers: [DevicesService]
})
export class DevicesModule {}
