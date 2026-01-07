import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
  ) {}

  @Post('tenant')
  async createTenant(@Body('name') name: string) {
    return this.adminService.createTenant(name);
  }
}
