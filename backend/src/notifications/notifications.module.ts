import { Module } from 'src/admin/node_modules/@nestjs/common';
import { NotificationsService } from './notifications.service';

@Module({
  providers: [NotificationsService],
  exports: [NotificationsService], // 👈 REQUIRED
})
export class NotificationsModule {}
