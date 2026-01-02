export declare class DevicesService {
    private prisma;
    resolvePersonByRfid(rfidTag: string): Promise<{
        id: string;
        tenantId: string;
        userId: string | null;
        type: import(".prisma/client").$Enums.PersonType;
        refId: string | null;
        rfidTag: string;
        isActive: boolean;
        createdAt: Date;
    }>;
}
