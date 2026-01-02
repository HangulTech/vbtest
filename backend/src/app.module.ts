import { Module } from 'src/admin/node_modules/@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HealthModule } from './health/health.module';
import { AdminModule } from './admin/admin.module';
import { AttendanceModule } from './attendance/attendance.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    HealthModule,

    // 🔥 Core application modules
    AdminModule,
    AttendanceModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
