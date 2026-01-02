import { Controller, Post, Body } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  // Generic logical event
  @Post('event')
  record(@Body() body: { studentId: string; eventType: string }) {
    return this.service.recordEvent(body);
  }

  // Manual override
  @Post('manual')
  manual(@Body() body: {
    studentId: string;
    date: string;
    status: 'PRESENT' | 'ABSENT';
  }) {
    return this.service.manualOverride(
      body.studentId,
      new Date(body.date),
      body.status
    );
  }
}
