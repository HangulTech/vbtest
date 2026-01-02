import { Controller, Post, Param, Get } from 'src/admin/node_modules/@nestjs/common';
import { TrackingService } from './tracking.service';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly tracking: TrackingService) {}

  @Post('trip/:id/start')
  start(@Param('id') id: string) {
    return this.tracking.startTrip(id);
  }

  @Post('trip/:id/next-stop')
  next(@Param('id') id: string) {
    return this.tracking.advanceStop(id);
  }

  @Get('trip/:id/eta')
  eta(@Param('id') id: string) {
    return this.tracking.getEta(id);
  }

  @Post('trip/:id/end')
  end(@Param('id') id: string) {
    return this.tracking.endTrip(id);
  }
}
