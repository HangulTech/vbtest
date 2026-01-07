import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async createTenant(name: string) {
    return this.prisma.tenant.create({
      data: { name },
    });
  }
}
