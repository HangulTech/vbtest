import { DevicesService } from './devices.service';
import { AttendanceService } from '../attendance/attendance.service';
export declare class DevicesController {
    private readonly devicesService;
    private readonly attendanceService;
    constructor(devicesService: DevicesService, attendanceService: AttendanceService);
    handleScan(req: any, body: {
        rfidTag: string;
        eventType: string;
        location?: string;
    }): Promise<{
        id: string;
        personId: string;
        eventType: string;
        source: string;
        location: string | null;
        timestamp: Date;
    }>;
}
