import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { NotificationType } from './notification.types';

@Injectable()
export class NotificationsService {
  private prisma = new PrismaClient();

  // =========================
  // CORE NOTIFICATION CREATION
  // =========================
  async createNotification(input: {
    studentId?: string;
    personId?: string;
    type: NotificationType;
    title: string;
    message: string;
    metadata?: Record<string, any>;
  }) {
    return this.prisma.notification.create({
      data: {
        studentId: input.studentId ?? null,
        personId: input.personId ?? null,
        type: input.type,
        title: input.title,
        message: input.message,
        metadata: input.metadata ?? {}
      }
    });
  }

  // =========================
  // STUDENT → PARENT NOTIFY
  // =========================
  async notifyParents(
    studentId: string,
    type: NotificationType,
    metadata?: Record<string, any>
  ) {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId }
    });

    if (!student) return;

    return this.createNotification({
      studentId,
      type,
      title: 'Student Update',
      message: this.buildMessage(type, metadata),
      metadata
    });
  }

  // =========================
  // FETCH
  // =========================
  async getNotificationsForStudent(studentId: string) {
    return this.prisma.notification.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' }
    });
  }

  // =========================
  // MESSAGE BUILDER
  // =========================
  private buildMessage(
    type: NotificationType,
    metadata?: Record<string, any>
  ): string {
    switch (type) {
      case 'STUDENT_ARRIVED':
        return `Student arrived at school at ${metadata?.time ?? ''}`;
      case 'STUDENT_LEFT':
        return `Student left school at ${metadata?.time ?? ''}`;
      case 'BUS_BOARDED':
        return `Student boarded the bus`;
      case 'BUS_DROPPED':
        return `Student dropped from bus`;
      default:
        return 'Student update';
    }
  }
}
