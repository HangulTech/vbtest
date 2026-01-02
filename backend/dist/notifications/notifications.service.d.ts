import { NOTIFICATION_TYPE } from './notification.types';
export declare class NotificationsService {
    private prisma;
    private logger;
    notifyParents(studentId: string, type: keyof typeof NOTIFICATION_TYPE, payload: {
        studentName: string;
        time?: string;
        eta?: string;
    }): Promise<void>;
}
