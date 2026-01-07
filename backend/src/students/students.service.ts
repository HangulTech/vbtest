import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StudentsService {
  private prisma = new PrismaClient();

  async createStudent(data: {
    fullName: string;
    rmfId: string;
    tenantId: string;
    personId: string;
  }) {
    return this.prisma.student.create({
      data: {
        fullName: data.fullName,
        rmfId: data.rmfId,

        tenant: {
          connect: { id: data.tenantId }
        },

        person: {
          connect: { id: data.personId }
        },

        isActive: true
      }
    });
  }

  async getStudents() {
    return this.prisma.student.findMany({
      include: {
        person: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
}
