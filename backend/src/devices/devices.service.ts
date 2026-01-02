import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DevicesService {
  private prisma = new PrismaClient();

  async resolvePersonByRfid(rfidTag: string) {
    const person = await this.prisma.person.findUnique({
      where: { rfidTag }
    });

    if (!person || !person.isActive) {
      throw new NotFoundException('RFID not registered to an active person');
    }

    return person;
  }
}
