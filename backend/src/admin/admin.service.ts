import { Injectable } from '@nestjs/common';
import { PrismaClient, PersonType } from '@prisma/client';

@Injectable()
export class AdminService {
  private prisma = new PrismaClient();

  // ==================
  // TENANT
  // ==================
  createTenant(name: string) {
    return this.prisma.tenant.create({
      data: {
        name,
        isActive: true
      }
    });
  }

  getTenants() {
    return this.prisma.tenant.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  // ==================
  // PERSON
  // ==================
  createPerson(data: {
    tenantId: string;
    type: PersonType;
    rfidTag: string;
    userId?: string;
  }) {
    return this.prisma.person.create({
      data: {
        tenantId: data.tenantId,
        type: data.type,
        rfidTag: data.rfidTag,
        userId: data.userId ?? null,
        isActive: true
      }
    });
  }

  getPersons() {
    return this.prisma.person.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  // ==================
  // STUDENT
  // ==================
  createStudent(data: {
    tenantId: string;
    fullName: string;
    rmfId: string;
    personId: string;
  }) {
    return this.prisma.student.create({
      data: {
        tenantId: data.tenantId,
        fullName: data.fullName,
        rmfId: data.rmfId,
        personId: data.personId,
        isActive: true
      }
    });
  }

  getStudents() {
    return this.prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        person: true
      }
    });
  }

  // ==================
  // ATTENDANCE (CORRECT)
  // ==================
  getAttendanceByDate(date: Date) {
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);

    return this.prisma.attendance.findMany({
      where: {
        date: day
      },
      include: {
        person: {
          include: {
            student: true
          }
        }
      },
      orderBy: {
        person: {
          createdAt: 'asc'
        }
      }
    });
  }

  getAllAttendance() {
    return this.prisma.attendance.findMany({
      include: {
        person: {
          include: {
            student: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    });
  }
}
