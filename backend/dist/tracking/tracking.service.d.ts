export declare class TrackingService {
    private prisma;
    startTrip(tripId: string): Promise<{
        id: string;
        routeId: string;
        driverId: string;
        startedAt: Date | null;
        endedAt: Date | null;
        currentStopIndex: number | null;
        createdAt: Date;
    }>;
    advanceStop(tripId: string): Promise<{
        tripId: string;
        currentStopIndex: number;
        totalStops: number;
        eta: Date;
    }>;
    getEta(tripId: string): Promise<{
        tripId: string;
        currentStopIndex: number;
        totalStops: number;
        eta: Date;
    }>;
    endTrip(tripId: string): Promise<{
        id: string;
        routeId: string;
        driverId: string;
        startedAt: Date | null;
        endedAt: Date | null;
        currentStopIndex: number | null;
        createdAt: Date;
    }>;
}
