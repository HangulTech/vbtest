import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      service: 'EduHan API',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
