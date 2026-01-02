import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class DeviceGuard implements CanActivate {
    private prisma;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
