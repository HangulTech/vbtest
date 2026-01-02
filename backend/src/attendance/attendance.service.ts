import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  ATTENDANCE_STATUS,
  ATTENDANCE_SOURCE,
  MORNING_CUTOFF_HOUR
} from './attendance.rules';
import { EVENT_TYPE } from './attendance.events';

@Injectable()
export class AttendanceService {
  private prisma = new PrismaClient();

  private normalizeDate(date: Date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  // Generic logical event (not device-specific)
  async recordEvent(input: {
    studentId: string;
    eventType: string;
    timestamp?: Date;
  }) {
    const ts = input.timestamp ?? new Date();
    const day = this.normalizeDate(ts);

    // 1. Store movement event
    await this.prisma.movementEvent.create({
      data: {
        studentId: input.studentId,
        eventType: input.eventType,
        source: 'SYSTEM',
        timestamp: ts
      }
    });

    // 2. Attendance derivation
    if (
      input.eventType === EVENT_TYPE.ENTER_SCHOOL ||
      input.eventType === EVENT_TYPE.BOARD_BUS
    ) {
      await this.prisma.attendance.upsert({
        where: { studentId_date: { studentId: input.studentId, date: day } },
        update: {
          status: ATTENDANCE_STATUS.PRESENT,
          source: ATTENDANCE_SOURCE.EVENT
        },
        create: {
          studentId: input.studentId,
          date: day,
          status: ATTENDANCE_STATUS.PRESENT,
          source: ATTENDANCE_SOURCE.EVENT
        }
      });
    }
  }

  // Run by cron / scheduler later
  async markAbsentIfNoEvents(date: Date) {
    const cutoff = new Date(date);
    cutoff.setHours(MORNING_CUTOFF_HOUR, 0, 0, 0);
    if (new Date() < cutoff) return;

    const day = this.normalizeDate(date);

    const students = await this.prisma.student.findMany({
      where: { isActive: true }
    });

    for (const s of students) {
      const hasEvent = await this.prisma.movementEvent.findFirst({
        where: { studentId: s.id, timestamp: { gte: day } }
      });

      if (!hasEvent) {
        await this.prisma.attendance.upsert({
          where: { studentId_date: { studentId: s.id, date: day } },
          update: {
            status: ATTENDANCE_STATUS.ABSENT,
            source: ATTENDANCE_SOURCE.EVENT
          },
          create: {
            studentId: s.id,
            date: day,
            status: ATTENDANCE_STATUS.ABSENT,
            source: ATTENDANCE_SOURCE.EVENT
          }
        });
      }
    }
  }

  async manualOverride(
    studentId: string,
    date: Date,
    status: 'PRESENT' | 'ABSENT'
  ) {
    const day = this.normalizeDate(date);

    return this.prisma.attendance.upsert({
      where: { studentId_date: { studentId, date: day } },
      update: { status, source: ATTENDANCE_SOURCE.MANUAL },
      create: { studentId, date: day, status, source: ATTENDANCE_SOURCE.MANUAL }
    });
  }
}
