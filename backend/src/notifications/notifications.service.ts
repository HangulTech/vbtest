import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { NOTIFICATION_TYPE } from './notification.types';
import { NotificationTemplates } from './notification.templates';

@Injectable()
export class NotificationsService {
  private prisma = new PrismaClient();
  private logger = new Logger('Notifications');

  async notifyParents(
    studentId: string,
    type: keyof typeof NOTIFICATION_TYPE,
    payload: {
      studentName: string;
      time?: string;
      eta?: string;
    }
  ) {
    // 1. Resolve parents
    const parents = await this.prisma.parentStudent.findMany({
      where: { studentId },
      include: { parent: { include: { user: true } } }
    });

    if (!parents.length) return;

    // 2. Build message
    const message = NotificationTemplates[type](
      payload.studentName,
      payload.time ?? payload.eta ?? ''
    );

    // 3. Queue notification (for now, log)
    parents.forEach(p => {
      this.logger.log(
        `[Notify ${p.parent.user?.phone ?? 'unknown'}]: ${message}`
      );
    });

    // Later:
    // - Push to queue
    // - Send SMS / WhatsApp / Push
  }
}
