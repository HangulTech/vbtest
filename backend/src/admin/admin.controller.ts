import { Body, Controller, Post } from '@nestjs/common'
import { AdminService } from './admin.service'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('tenant')
  createTenant(@Body('name') name: string) {
    return this.adminService.createTenant(name)
  }
}
