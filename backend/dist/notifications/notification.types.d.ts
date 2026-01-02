export declare const NOTIFICATION_TYPE: {
    readonly STUDENT_ARRIVED: "STUDENT_ARRIVED";
    readonly STUDENT_LEFT: "STUDENT_LEFT";
    readonly BUS_BOARDED: "BUS_BOARDED";
    readonly BUS_DROPPED: "BUS_DROPPED";
    readonly ETA_UPDATE: "ETA_UPDATE";
};
export type NotificationType = typeof NOTIFICATION_TYPE[keyof typeof NOTIFICATION_TYPE];
