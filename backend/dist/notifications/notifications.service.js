"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const notification_templates_1 = require("./notification.templates");
let NotificationsService = class NotificationsService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.logger = new common_1.Logger('Notifications');
    }
    async notifyParents(studentId, type, payload) {
        const parents = await this.prisma.parentStudent.findMany({
            where: { studentId },
            include: { parent: { include: { user: true } } }
        });
        if (!parents.length)
            return;
        const message = notification_templates_1.NotificationTemplates[type](payload.studentName, payload.time ?? payload.eta ?? '');
        parents.forEach(p => {
            this.logger.log(`[Notify ${p.parent.user?.phone ?? 'unknown'}]: ${message}`);
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)()
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map