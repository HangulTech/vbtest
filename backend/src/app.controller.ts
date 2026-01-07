import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() {
    return {
      name: 'EduHan API',
      status: 'running',
      version: '0.1.0'
    };
  }
}
