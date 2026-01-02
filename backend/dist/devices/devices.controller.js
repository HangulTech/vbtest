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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesController = void 0;
const common_1 = require("@nestjs/common");
const devices_service_1 = require("./devices.service");
const attendance_service_1 = require("../attendance/attendance.service");
const devices_guard_1 = require("./devices.guard");
let DevicesController = class DevicesController {
    constructor(devicesService, attendanceService) {
        this.devicesService = devicesService;
        this.attendanceService = attendanceService;
    }
    async handleScan(req, body) {
        const device = req.device;
        const person = await this.devicesService.resolvePersonByRfid(body.rfidTag);
        return this.attendanceService.recordEvent({
            personId: person.id,
            eventType: body.eventType,
            source: device.type,
            location: body.location ?? device.location
        });
    }
};
exports.DevicesController = DevicesController;
__decorate([
    (0, common_1.Post)('rfid-scan'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "handleScan", null);
exports.DevicesController = DevicesController = __decorate([
    (0, common_1.Controller)('devices'),
    (0, common_1.UseGuards)(devices_guard_1.DeviceGuard),
    __metadata("design:paramtypes", [devices_service_1.DevicesService,
        attendance_service_1.AttendanceService])
], DevicesController);
//# sourceMappingURL=devices.controller.js.map