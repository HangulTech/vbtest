import { TrackingService } from './tracking.service';
export declare class TrackingController {
    private readonly tracking;
    constructor(tracking: TrackingService);
    start(id: string): Promise<{
        id: string;
        routeId: string;
        driverId: string;
        startedAt: Date | null;
        endedAt: Date | null;
        currentStopIndex: number | null;
        createdAt: Date;
    }>;
    next(id: string): Promise<{
        tripId: string;
        currentStopIndex: number;
        totalStops: number;
        eta: Date;
    }>;
    eta(id: string): Promise<{
        tripId: string;
        currentStopIndex: number;
        totalStops: number;
        eta: Date;
    }>;
    end(id: string): Promise<{
        id: string;
        routeId: string;
        driverId: string;
        startedAt: Date | null;
        endedAt: Date | null;
        currentStopIndex: number | null;
        createdAt: Date;
    }>;
}
