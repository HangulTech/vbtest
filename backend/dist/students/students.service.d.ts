export declare class StudentsService {
    private prisma;
    createStudent(tenantId: string, fullName: string): Promise<{
        id: string;
        rmfId: string;
        fullName: string;
        rollNumber: string | null;
        tenantId: string;
        personId: string | null;
        isActive: boolean;
        createdAt: Date;
    }>;
}
