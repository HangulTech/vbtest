"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const rmf_util_1 = require("./rmf.util");
let StudentsService = class StudentsService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async createStudent(tenantId, fullName) {
        const school = await this.prisma.schoolProfile.findUnique({
            where: { tenantId }
        });
        if (!school) {
            throw new Error('School profile not found');
        }
        let rmfId;
        let exists = true;
        while (exists) {
            rmfId = (0, rmf_util_1.generateRMF)(school.schoolCode);
            const count = await this.prisma.student.count({
                where: { rmfId }
            });
            exists = count > 0;
        }
        return this.prisma.student.create({
            data: {
                fullName,
                tenantId,
                rmfId
            }
        });
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)()
], StudentsService);
//# sourceMappingURL=students.service.js.map