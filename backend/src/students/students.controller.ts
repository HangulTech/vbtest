import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('api/admin/student')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async createStudent(@Body() body: {
    fullName: string;
    rmfId: string;
    tenantId: string;
    personId: string;
  }) {
    return this.studentsService.createStudent({
      fullName: body.fullName,
      rmfId: body.rmfId,
      tenantId: body.tenantId,
      personId: body.personId
    });
  }

  @Get()
  async getStudents() {
    return this.studentsService.getStudents();
  }
}
