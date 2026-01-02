import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { generateRMF } from './rmf.util';

@Injectable()
export class StudentsService {
  private prisma = new PrismaClient();

  async createStudent(tenantId: string, fullName: string) {
    const school = await this.prisma.schoolProfile.findUnique({
      where: { tenantId }
    });

    if (!school) {
      throw new Error('School profile not found');
    }

    let rmfId: string;
    let exists = true;

    // Collision-safe generation
    while (exists) {
      rmfId = generateRMF(school.schoolCode);
      const count = await this.prisma.student.count({
        where: { rmfId }
      });
      exists = count > 0;
    }

    return this.prisma.student.create({
      data: {
        fullName,
        tenantId,
        rmfId
      }
    });
  }
}
