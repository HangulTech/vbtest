import { StudentsService } from './students.service';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    create(body: {
        tenantId: string;
        fullName: string;
    }): Promise<{
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
