"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const attendance_events_1 = require("./attendance.events");
const attendance_rules_1 = require("./attendance.rules");
const notifications_service_1 = require("../notifications/notifications.service");
const notification_types_1 = require("../notifications/notification.types");
let AttendanceService = class AttendanceService {
    constructor(notifications) {
        this.notifications = notifications;
        this.prisma = new client_1.PrismaClient();
    }
    normalizeDate(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    }
    async recordEvent(input) {
        const ts = input.timestamp ?? new Date();
        const day = this.normalizeDate(ts);
        const event = await this.prisma.movementEvent.create({
            data: {
                personId: input.personId,
                eventType: input.eventType,
                source: input.source,
                location: input.location,
                timestamp: ts
            }
        });
        if (input.eventType === attendance_events_1.EVENT_TYPE.ENTER_SCHOOL ||
            input.eventType === attendance_events_1.EVENT_TYPE.BOARD_BUS) {
            await this.prisma.attendance.upsert({
                where: {
                    personId_date: {
                        personId: input.personId,
                        date: day
                    }
                },
                update: {
                    status: client_1.AttendanceStatus.PRESENT,
                    source: 'EVENT'
                },
                create: {
                    personId: input.personId,
                    date: day,
                    status: client_1.AttendanceStatus.PRESENT,
                    source: 'EVENT'
                }
            });
            const person = await this.prisma.person.findUnique({
                where: { id: input.personId },
                include: { student: true }
            });
            if (person?.type === client_1.PersonType.STUDENT && person.student) {
                await this.notifications.notifyParents(person.student.id, notification_types_1.NOTIFICATION_TYPE.STUDENT_ARRIVED, {
                    studentName: person.student.fullName,
                    time: ts.toLocaleTimeString()
                });
            }
        }
        return event;
    }
    async markAbsentIfNoEvents(date) {
        const cutoff = new Date(date);
        cutoff.setHours(attendance_rules_1.MORNING_CUTOFF_HOUR, 0, 0, 0);
        if (new Date() < cutoff)
            return;
        const day = this.normalizeDate(date);
        const persons = await this.prisma.person.findMany({
            where: { isActive: true }
        });
        for (const p of persons) {
            const hasEvent = await this.prisma.movementEvent.findFirst({
                where: {
                    personId: p.id,
                    timestamp: { gte: day }
                }
            });
            if (!hasEvent) {
                await this.prisma.attendance.upsert({
                    where: {
                        personId_date: {
                            personId: p.id,
                            date: day
                        }
                    },
                    update: {
                        status: client_1.AttendanceStatus.ABSENT,
                        source: 'EVENT'
                    },
                    create: {
                        personId: p.id,
                        date: day,
                        status: client_1.AttendanceStatus.ABSENT,
                        source: 'EVENT'
                    }
                });
            }
        }
    }
    async manualOverride(personId, date, status) {
        const day = this.normalizeDate(date);
        return this.prisma.attendance.upsert({
            where: {
                personId_date: {
                    personId,
                    date: day
                }
            },
            update: {
                status,
                source: 'MANUAL'
            },
            create: {
                personId,
                date: day,
                status,
                source: 'MANUAL'
            }
        });
    }
    async resolveStudentForPerson(personId) {
        return this.prisma.student.findUnique({
            where: { personId }
        });
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map