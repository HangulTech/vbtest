import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DevicesService {
  private prisma = new PrismaClient();

  /**
   * Resolve a Person by RFID tag
   */
  async resolvePerson(rfidTag: string) {
    return this.prisma.person.findUnique({
      where: { rfidTag }
    });
  }

  /**
   * Create movement event + attendance
   */
  async createEvent(input: {
    personId: string;
    eventType: string;
    source: string;
    location?: string;
  }) {
    // 1️⃣ Create movement event
    const event = await this.prisma.movementEvent.create({
      data: {
        personId: input.personId,
        eventType: input.eventType,
        source: input.source,
        location: input.location
      }
    });

    // 2️⃣ Auto mark attendance (PRESENT)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await this.prisma.attendance.upsert({
      where: {
        personId_date: {
          personId: input.personId,
          date: today
        }
      },
      update: {
        status: 'PRESENT',
        source: 'EVENT'
      },
      create: {
        personId: input.personId,
        date: today,
        status: 'PRESENT',
        source: 'EVENT'
      }
    });

    return {
      status: 'ok',
      event
    };
  }
}
