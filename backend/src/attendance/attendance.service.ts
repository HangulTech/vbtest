import { Injectable } from '@nestjs/common';
import {
  PrismaClient,
  AttendanceStatus,
  PersonType
} from '@prisma/client';
import { EVENT_TYPE } from './attendance.events';
import { NotificationsService } from '../notifications/notifications.service';
import { NOTIFICATION_TYPE } from '../notifications/notification.types';

@Injectable()
export class AttendanceService {
  private prisma = new PrismaClient();

  constructor(
    private readonly notifications: NotificationsService
  ) {}

  // -------------------------
  // Utils
  // -------------------------
  private normalizeDate(date: Date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  // =========================
  // RECORD EVENT
  // =========================
  async recordEvent(input: {
    personId: string;
    eventType: string;
    source: string;
    timestamp?: Date;
    location?: string;
  }) {
    const ts = input.timestamp ?? new Date();
    const day = this.normalizeDate(ts);

    // 1️⃣ Store movement
    const event = await this.prisma.movementEvent.create({
      data: {
        personId: input.personId,
        eventType: input.eventType,
        source: input.source,
        location: input.location,
        timestamp: ts
      }
    });

    // 2️⃣ Attendance + Notifications
    if (
      input.eventType === EVENT_TYPE.ENTER_SCHOOL ||
      input.eventType === EVENT_TYPE.BOARD_BUS
    ) {
      await this.prisma.attendance.upsert({
        where: {
          personId_date: {
            personId: input.personId,
            date: day
          }
        },
        update: {
          status: AttendanceStatus.PRESENT,
          source: 'EVENT'
        },
        create: {
          personId: input.personId,
          date: day,
          status: AttendanceStatus.PRESENT,
          source: 'EVENT'
        }
      });

      const person = await this.prisma.person.findUnique({
        where: { id: input.personId },
        include: { student: true }
      });

      if (person?.type === PersonType.STUDENT && person.student) {
        await this.notifications.notifyParents(
          person.student.id,
          input.eventType === EVENT_TYPE.ENTER_SCHOOL
            ? NOTIFICATION_TYPE.STUDENT_ARRIVED
            : NOTIFICATION_TYPE.BUS_BOARDED,
          {
            time: ts.toISOString(),
            location: input.location
          }
        );
      }
    }

    if (input.eventType === EVENT_TYPE.EXIT_SCHOOL) {
      const student = await this.prisma.student.findFirst({
        where: { personId: input.personId }
      });

      if (student) {
        await this.notifications.notifyParents(
          student.id,
          NOTIFICATION_TYPE.STUDENT_LEFT,
          { time: ts.toISOString() }
        );
      }
    }

    return event;
  }

  // =========================
  // MANUAL OVERRIDE
  // =========================
  async manualOverride(
    personId: string,
    date: Date,
    status: AttendanceStatus
  ) {
    const day = this.normalizeDate(date);

    return this.prisma.attendance.upsert({
      where: {
        personId_date: {
          personId,
          date: day
        }
      },
      update: {
        status,
        source: 'MANUAL'
      },
      create: {
        personId,
        date: day,
        status,
        source: 'MANUAL'
      }
    });
  }
}
