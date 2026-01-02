import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from 'src/admin/node_modules/@nestjs/common';
import { PrismaClient } from 'src/admin/node_modules/@prisma/client';

@Injectable()
export class DeviceGuard implements CanActivate {
  private prisma = new PrismaClient();

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const deviceId = req.headers['x-device-id'];
    const deviceKey = req.headers['x-device-key'];

    if (!deviceId || !deviceKey) {
      throw new UnauthorizedException('Device credentials missing');
    }

    const device = await this.prisma.device.findUnique({
      where: { deviceId }
    });

    if (!device || !device.isActive || device.secretKey !== deviceKey) {
      throw new UnauthorizedException('Invalid or inactive device');
    }

    // attach device to request for later use
    req.device = device;
    return true;
  }
}
