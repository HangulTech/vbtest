import { Injectable } from 'src/admin/node_modules/@nestjs/common';
import {
  PrismaClient,
  PersonType,
  AttendanceStatus
} from 'src/admin/node_modules/@prisma/client';
import { EVENT_TYPE } from './attendance.events';
import { MORNING_CUTOFF_HOUR } from './attendance.rules';
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
  // RECORD EVENT (CORE)
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

    // 1️⃣ Store movement event
    const event = await this.prisma.movementEvent.create({
      data: {
        personId: input.personId,
        eventType: input.eventType,
        source: input.source,
        location: input.location,
        timestamp: ts
      }
    });

    // 2️⃣ Attendance derivation
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

      // 🔔 Notifications (students only)
      const person = await this.prisma.person.findUnique({
        where: { id: input.personId },
        include: { student: true }
      });

      if (person?.type === PersonType.STUDENT && person.student) {
        await this.notifications.notifyParents(
          person.student.id,
          NOTIFICATION_TYPE.STUDENT_ARRIVED,
          {
            studentName: person.student.fullName,
            time: ts.toLocaleTimeString()
          }
        );
      }
    }

    return event;
  }

  // =========================
  // AUTO ABSENT MARKING
  // =========================
  async markAbsentIfNoEvents(date: Date) {
    const cutoff = new Date(date);
    cutoff.setHours(MORNING_CUTOFF_HOUR, 0, 0, 0);

    if (new Date() < cutoff) return;

    const day = this.normalizeDate(date);

    // 🔥 Loop over PERSONS (students + staff)
    const persons = await this.prisma.person.findMany({
      where: { isActive: true }
    });

    for (const p of persons) {
      const hasEvent = await this.prisma.movementEvent.findFirst({
        where: {
          personId: p.id,
          timestamp: { gte: day }
        }
      });

      if (!hasEvent) {
        await this.prisma.attendance.upsert({
          where: {
            personId_date: {
              personId: p.id,
              date: day
            }
          },
          update: {
            status: AttendanceStatus.ABSENT,
            source: 'EVENT'
          },
          create: {
            personId: p.id,
            date: day,
            status: AttendanceStatus.ABSENT,
            source: 'EVENT'
          }
        });
      }
    }
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

  // =========================
  // HELPER (USED BY NOTIFICATIONS / REPORTS)
  // =========================
  async resolveStudentForPerson(personId: string) {
    return this.prisma.student.findUnique({
      where: { personId }
    });
  }
}
