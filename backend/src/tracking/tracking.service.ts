import { Injectable, NotFoundException } from 'src/admin/node_modules/@nestjs/common';
import { PrismaClient } from 'src/admin/node_modules/@prisma/client';
import { EtaEngine } from './eta.engine';

@Injectable()
export class TrackingService {
  private prisma = new PrismaClient();

  async startTrip(tripId: string) {
    return this.prisma.trip.update({
      where: { id: tripId },
      data: {
        startedAt: new Date(),
        currentStopIndex: 0
      }
    });
  }

  async advanceStop(tripId: string) {
    const trip = await this.prisma.trip.findUnique({
      where: { id: tripId },
      include: { route: { include: { stops: true } } }
    });

    if (!trip || !trip.startedAt) {
      throw new NotFoundException('Active trip not found');
    }

    const nextIndex = (trip.currentStopIndex ?? 0) + 1;

    await this.prisma.trip.update({
      where: { id: tripId },
      data: { currentStopIndex: nextIndex }
    });

    return this.getEta(tripId);
  }

  async getEta(tripId: string) {
    const trip = await this.prisma.trip.findUnique({
      where: { id: tripId },
      include: { route: { include: { stops: true } } }
    });

    if (!trip || !trip.startedAt) {
      throw new NotFoundException('Trip not active');
    }

    return {
      tripId,
      currentStopIndex: trip.currentStopIndex,
      totalStops: trip.route.stops.length,
      eta: EtaEngine.computeEta(
        trip.route.stops.length,
        trip.currentStopIndex ?? 0,
        trip.startedAt
      )
    };
  }

  async endTrip(tripId: string) {
    return this.prisma.trip.update({
      where: { id: tripId },
      data: { endedAt: new Date() }
    });
  }
}
