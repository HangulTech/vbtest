"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const eta_engine_1 = require("./eta.engine");
let TrackingService = class TrackingService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async startTrip(tripId) {
        return this.prisma.trip.update({
            where: { id: tripId },
            data: {
                startedAt: new Date(),
                currentStopIndex: 0
            }
        });
    }
    async advanceStop(tripId) {
        const trip = await this.prisma.trip.findUnique({
            where: { id: tripId },
            include: { route: { include: { stops: true } } }
        });
        if (!trip || !trip.startedAt) {
            throw new common_1.NotFoundException('Active trip not found');
        }
        const nextIndex = (trip.currentStopIndex ?? 0) + 1;
        await this.prisma.trip.update({
            where: { id: tripId },
            data: { currentStopIndex: nextIndex }
        });
        return this.getEta(tripId);
    }
    async getEta(tripId) {
        const trip = await this.prisma.trip.findUnique({
            where: { id: tripId },
            include: { route: { include: { stops: true } } }
        });
        if (!trip || !trip.startedAt) {
            throw new common_1.NotFoundException('Trip not active');
        }
        return {
            tripId,
            currentStopIndex: trip.currentStopIndex,
            totalStops: trip.route.stops.length,
            eta: eta_engine_1.EtaEngine.computeEta(trip.route.stops.length, trip.currentStopIndex ?? 0, trip.startedAt)
        };
    }
    async endTrip(tripId) {
        return this.prisma.trip.update({
            where: { id: tripId },
            data: { endedAt: new Date() }
        });
    }
};
exports.TrackingService = TrackingService;
exports.TrackingService = TrackingService = __decorate([
    (0, common_1.Injectable)()
], TrackingService);
//# sourceMappingURL=tracking.service.js.map