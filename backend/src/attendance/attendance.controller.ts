import { Controller, Post, Body } from 'src/admin/node_modules/@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Post('event')
  record(@Body() body: {
    personId: string;
    eventType: string;
    source: string;
    location?: string;
  }) {
    return this.service.recordEvent({
      personId: body.personId,
      eventType: body.eventType,
      source: body.source,
      location: body.location
    });
  }

  @Post('manual')
  manual(@Body() body: {
    personId: string;
    date: string;
    status: 'PRESENT' | 'ABSENT';
  }) {
    return this.service.manualOverride(
      body.personId,
      new Date(body.date),
      body.status
    );
  }
}
