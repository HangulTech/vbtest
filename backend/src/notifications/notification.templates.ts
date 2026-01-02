export const NotificationTemplates = {
  STUDENT_ARRIVED: (name: string, time: string) =>
    `✅ ${name} has arrived at school at ${time}.`,

  STUDENT_LEFT: (name: string, time: string) =>
    `🚪 ${name} has left the school premises at ${time}.`,

  BUS_BOARDED: (name: string, time: string) =>
    `🚌 ${name} boarded the school bus at ${time}.`,

  BUS_DROPPED: (name: string, time: string) =>
    `📍 ${name} was dropped safely at ${time}.`,

  ETA_UPDATE: (name: string, eta: string) =>
    `⏱ ${name}'s bus is expected to arrive at ${eta}.`
};
