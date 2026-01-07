import { Body, Controller, Post } from '@nestjs/common';
import { DevicesService } from './devices.service';

@Controller('api/device')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  /**
   * RFID / Device event entry point
   */
  @Post('event')
  async receiveEvent(@Body() body: {
    rfidTag: string;
    eventType: string;
    source: string;
    location?: string;
  }) {
    const person = await this.devicesService.resolvePerson(body.rfidTag);

    if (!person) {
      return {
        status: 'ignored',
        reason: 'Unknown RFID'
      };
    }

    return this.devicesService.createEvent({
      personId: person.id,
      eventType: body.eventType,
      source: body.source,
      location: body.location
    });
  }
}
