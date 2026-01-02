import { AdminService } from './admin.service';
import { PersonType } from '@prisma/client';
export declare class AdminController {
    private readonly service;
    constructor(service: AdminService);
    createTenant(body: {
        name: string;
    }): import(".prisma/client").Prisma.Prisma__TenantClient<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createPerson(body: {
        tenantId: string;
        type: PersonType;
        rfidTag: string;
        userId?: string;
    }): import(".prisma/client").Prisma.Prisma__PersonClient<{
        id: string;
        tenantId: string;
        userId: string | null;
        type: import(".prisma/client").$Enums.PersonType;
        refId: string | null;
        rfidTag: string;
        isActive: boolean;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createStudent(body: {
        tenantId: string;
        fullName: string;
        rmfId: string;
        personId: string;
    }): import(".prisma/client").Prisma.Prisma__StudentClient<{
        id: string;
        rmfId: string;
        fullName: string;
        rollNumber: string | null;
        tenantId: string;
        personId: string | null;
        isActive: boolean;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getAttendance(date: string): import(".prisma/client").Prisma.PrismaPromise<({
        person: {
            student: {
                id: string;
                rmfId: string;
                fullName: string;
                rollNumber: string | null;
                tenantId: string;
                personId: string | null;
                isActive: boolean;
                createdAt: Date;
            };
        } & {
            id: string;
            tenantId: string;
            userId: string | null;
            type: import(".prisma/client").$Enums.PersonType;
            refId: string | null;
            rfidTag: string;
            isActive: boolean;
            createdAt: Date;
        };
    } & {
        id: string;
        personId: string;
        date: Date;
        status: import(".prisma/client").$Enums.AttendanceStatus;
        source: string;
        createdAt: Date;
    })[]>;
}
