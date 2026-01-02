import { Controller, Post, Body, UseGuards, Req } from 'src/admin/node_modules/@nestjs/common';
import { DevicesService } from './devices.service';
import { AttendanceService } from '../attendance/attendance.service';
import { DeviceGuard } from './devices.guard';

@Controller('devices')
@UseGuards(DeviceGuard)
export class DevicesController {
  constructor(
    private readonly devicesService: DevicesService,
    private readonly attendanceService: AttendanceService
  ) {}

  @Post('rfid-scan')
  async handleScan(
    @Req() req,
    @Body()
    body: {
      rfidTag: string;
      eventType: string;
      location?: string;
    }
  ) {
    const device = req.device;

    // 1. Resolve RFID → Person
    const person = await this.devicesService.resolvePersonByRfid(body.rfidTag);

    // 2. Record event (attendance logic auto-triggers)
    return this.attendanceService.recordEvent({
      personId: person.id,
      eventType: body.eventType,
      source: device.type, // SCHOOL_RFID / BUS_RFID
      location: body.location ?? device.location
    });
  }
}
    