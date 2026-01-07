import { NotificationType } from './notification.types';

export const NotificationTemplates: Record<
  NotificationType,
  (...args: any[]) => string
> = {
  STUDENT_ARRIVED: (studentName: string, time: string) =>
    `✅ ${studentName} arrived at school at ${time}.`,

  STUDENT_LEFT: (studentName: string, time: string) =>
    `🚪 ${studentName} left school at ${time}.`,

  BUS_BOARDED: (studentName: string, busNo?: string) =>
    `🚌 ${studentName} boarded the bus${busNo ? ` (${busNo})` : ''}.`,

  BUS_DROPPED: (studentName: string, time?: string) =>
    `🏠 ${studentName} was dropped${time ? ` at ${time}` : ''}.`,

  ETA_UPDATE: (studentName: string, eta: string) =>
    `⏱️ Bus ETA update for ${studentName}: ${eta}.`
};
