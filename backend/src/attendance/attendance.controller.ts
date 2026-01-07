import { Controller, Post, Body } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceStatus } from '@prisma/client';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  // -------------------------
  // RECORD EVENT
  // -------------------------
  @Post('event')
  recordEvent(@Body() body: {
    personId: string;
    eventType: string;
    source: string;
    timestamp?: Date;
    location?: string;
  }) {
    return this.service.recordEvent(body);
  }

  // -------------------------
  // MANUAL OVERRIDE
  // -------------------------
  @Post('manual')
  manualOverride(@Body() body: {
    personId: string;
    date: string;
    status: AttendanceStatus;
  }) {
    return this.service.manualOverride(
      body.personId,
      new Date(body.date),
      body.status
    );
  }
}
