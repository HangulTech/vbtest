import { Injectable, NotFoundException } from 'src/admin/node_modules/@nestjs/common';
import { PrismaClient } from 'src/admin/node_modules/@prisma/client';

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
