import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.student.findMany({
      include: {
        person: true,
        enrollments: {
          include: {
            section: {
              include: {
                class: true,
              },
            },
            academicYear: true,
          },
        },
      },
    });
  }
}
