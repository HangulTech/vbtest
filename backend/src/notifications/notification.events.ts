/**
 * Notification trigger events
 * These are semantic events used by business logic
 * (attendance, transport, exams, fees, etc.)
 */

export const NOTIFICATION_EVENT = {
  // --------------------
  // ATTENDANCE
  // --------------------
  STUDENT_ENTERED_SCHOOL: 'STUDENT_ENTERED_SCHOOL',
  STUDENT_EXITED_SCHOOL: 'STUDENT_EXITED_SCHOOL',
  STUDENT_MARKED_ABSENT: 'STUDENT_MARKED_ABSENT',

  // --------------------
  // TRANSPORT
  // --------------------
  STUDENT_BOARDED_BUS: 'STUDENT_BOARDED_BUS',
  STUDENT_DROPPED_BUS: 'STUDENT_DROPPED_BUS',
  BUS_ETA_UPDATED: 'BUS_ETA_UPDATED',

  // --------------------
  // ACADEMICS (future)
  // --------------------
  HOMEWORK_ASSIGNED: 'HOMEWORK_ASSIGNED',
  EXAM_RESULT_PUBLISHED: 'EXAM_RESULT_PUBLISHED',

  // --------------------
  // SYSTEM
  // --------------------
  SYSTEM_ANNOUNCEMENT: 'SYSTEM_ANNOUNCEMENT'
} as const;

export type NotificationEvent =
  typeof NOTIFICATION_EVENT[keyof typeof NOTIFICATION_EVENT];
