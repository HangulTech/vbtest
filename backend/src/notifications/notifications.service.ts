import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  getSystemNotifications() {
    return this.prisma.notification.findMany({
      where: { type: 'SYSTEM' },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }
}
