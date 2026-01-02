"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationTemplates = void 0;
exports.NotificationTemplates = {
    STUDENT_ARRIVED: (name, time) => `✅ ${name} has arrived at school at ${time}.`,
    STUDENT_LEFT: (name, time) => `🚪 ${name} has left the school premises at ${time}.`,
    BUS_BOARDED: (name, time) => `🚌 ${name} boarded the school bus at ${time}.`,
    BUS_DROPPED: (name, time) => `📍 ${name} was dropped safely at ${time}.`,
    ETA_UPDATE: (name, eta) => `⏱ ${name}'s bus is expected to arrive at ${eta}.`
};
//# sourceMappingURL=notification.templates.js.map