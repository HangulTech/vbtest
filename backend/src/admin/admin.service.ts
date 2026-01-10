import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async createTenant(name: string) {
    const code = name
      .trim()
      .toUpperCase()
      .replace(/\s+/g, '_')

    return this.prisma.tenant.create({
      data: {
        name,
        code
      }
    })
  }
}
