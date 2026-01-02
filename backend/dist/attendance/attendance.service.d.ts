import { AttendanceStatus } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
export declare class AttendanceService {
    private readonly notifications;
    private prisma;
    constructor(notifications: NotificationsService);
    private normalizeDate;
    recordEvent(input: {
        personId: string;
        eventType: string;
        source: string;
        timestamp?: Date;
        location?: string;
    }): Promise<{
        id: string;
        personId: string;
        eventType: string;
        source: string;
        location: string | null;
        timestamp: Date;
    }>;
    markAbsentIfNoEvents(date: Date): Promise<void>;
    manualOverride(personId: string, date: Date, status: AttendanceStatus): Promise<{
        id: string;
        personId: string;
        date: Date;
        status: import(".prisma/client").$Enums.AttendanceStatus;
        source: string;
        createdAt: Date;
    }>;
    resolveStudentForPerson(personId: string): Promise<{
        id: string;
        rmfId: string;
        fullName: string;
        rollNumber: string | null;
        tenantId: string;
        personId: string | null;
        isActive: boolean;
        createdAt: Date;
    }>;
}
