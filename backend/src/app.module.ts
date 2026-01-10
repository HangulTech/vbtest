import { Module } from '@nestjs/common'
import { AdminModule } from './admin/admin.module'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { HealthModule } from './health/health.module'

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    HealthModule,
    AdminModule
  ]
})
export class AppModule {}
