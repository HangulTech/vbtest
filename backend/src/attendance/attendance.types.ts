// src/notifications/notification.types.ts

/**
 * All notification types supported by the system.
 * This is a CONTRACT file.
 * Do NOT put logic here.
 */

export const NOTIFICATION_TYPE = {
  // Attendance based
  STUDENT_ARRIVED: 'STUDENT_ARRIVED',
  STUDENT_LEFT: 'STUDENT_LEFT',

  // Transport based
  BUS_BOARDED: 'BUS_BOARDED',
  BUS_DROPPED: 'BUS_DROPPED',

  // ETA / Live tracking
  ETA_UPDATE: 'ETA_UPDATE'
} as const;

/**
 * Union type of all notification values
 * Example: 'STUDENT_ARRIVED' | 'BUS_BOARDED' | ...
 */
export type NotificationType =
  typeof NOTIFICATION_TYPE[keyof typeof NOTIFICATION_TYPE];
