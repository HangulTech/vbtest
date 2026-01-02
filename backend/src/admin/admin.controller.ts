import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PersonType } from '@prisma/client';

@Controller('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  // ------------------
  // TENANT
  // ------------------
  @Post('tenant')
  createTenant(@Body() body: { name: string }) {
    return this.service.createTenant(body.name);
  }

  @Get('tenant')
  getTenants() {
    return this.service.getTenants();
  }

  // ------------------
  // PERSON
  // ------------------
  @Post('person')
  createPerson(@Body() body: {
    tenantId: string;
    type: PersonType;
    rfidTag: string;
    userId?: string;
  }) {
    return this.service.createPerson(body);
  }

  @Get('person')
  getPersons() {
    return this.service.getPersons();
  }

  // ------------------
  // STUDENT
  // ------------------
  @Post('student')
  createStudent(@Body() body: {
    tenantId: string;
    fullName: string;
    rmfId: string;
    personId: string;
  }) {
    return this.service.createStudent(body);
  }

  @Get('student')
  getStudents() {
    return this.service.getStudents();
  }

  // ------------------
  // ATTENDANCE
  // ------------------
  @Get('attendance')
  getAttendance(@Query('date') date?: string) {
    if (!date) {
      return this.service.getAllAttendance();
    }
    return this.service.getAttendanceByDate(new Date(date));
  }
}
