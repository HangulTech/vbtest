import { Controller, Get } from 'src/admin/node_modules/@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString()
    };
  }
}
