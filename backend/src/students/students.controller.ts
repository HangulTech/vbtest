import { Controller, Post, Body } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(
    @Body() body: { tenantId: string; fullName: string }
  ) {
    return this.studentsService.createStudent(
      body.tenantId,
      body.fullName
    );
  }
}
