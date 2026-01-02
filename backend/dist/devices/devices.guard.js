"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceGuard = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let DeviceGuard = class DeviceGuard {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const deviceId = req.headers['x-device-id'];
        const deviceKey = req.headers['x-device-key'];
        if (!deviceId || !deviceKey) {
            throw new common_1.UnauthorizedException('Device credentials missing');
        }
        const device = await this.prisma.device.findUnique({
            where: { deviceId }
        });
        if (!device || !device.isActive || device.secretKey !== deviceKey) {
            throw new common_1.UnauthorizedException('Invalid or inactive device');
        }
        req.device = device;
        return true;
    }
};
exports.DeviceGuard = DeviceGuard;
exports.DeviceGuard = DeviceGuard = __decorate([
    (0, common_1.Injectable)()
], DeviceGuard);
//# sourceMappingURL=devices.guard.js.map