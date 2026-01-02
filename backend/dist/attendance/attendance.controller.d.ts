import { AttendanceService } from './attendance.service';
export declare class AttendanceController {
    private readonly service;
    constructor(service: AttendanceService);
    record(body: {
        personId: string;
        eventType: string;
        source: string;
        location?: string;
    }): Promise<{
        id: string;
        personId: string;
        eventType: string;
        source: string;
        location: string | null;
        timestamp: Date;
    }>;
    manual(body: {
        personId: string;
        date: string;
        status: 'PRESENT' | 'ABSENT';
    }): Promise<{
        id: string;
        personId: string;
        date: Date;
        status: import(".prisma/client").$Enums.AttendanceStatus;
        source: string;
        createdAt: Date;
    }>;
}
