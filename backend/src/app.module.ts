import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { TenantsModule } from './tenants/tenants.module';
import { NotificationsModule } from './notifications/notifications.module';
import { StudentsModule } from './students/students.module';


@Module({
  imports: [
    PrismaModule,
    AdminModule,
    HealthModule,
    TenantsModule,
    NotificationsModule,
    StudentsModule,
  ],
})
export class AppModule {}
