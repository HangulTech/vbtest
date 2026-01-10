import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { LoginDto } from './dto/login.dto'
import { AccountStatus } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  async login(dto: LoginDto) {
    const person = await this.prisma.person.findFirst({
      where: {
        status: AccountStatus.ACTIVE,
        OR: [
          { email: dto.identifier },
          { phone: dto.identifier }
        ]
      },
      include: {
        memberships: {
          include: {
            role: true,
            tenant: true
          }
        }
      }
    })

    if (!person || person.memberships.length === 0) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const membership =
      (dto.tenantCode
        ? person.memberships.find(m => m.tenant.code === dto.tenantCode)
        : undefined) ??
      (dto.roleType
        ? person.memberships.find(m => m.role.type === dto.roleType)
        : undefined) ??
      person.memberships[0]

    if (!membership) {
      throw new UnauthorizedException('No matching tenant or role')
    }

    const payload = {
      sub: person.id,
      membershipId: membership.id,
      role: membership.role.type,
      tenantId: membership.tenantId
    }

    return {
      accessToken: this.jwt.sign(payload),
      user: {
        id: person.id,
        name: `${person.firstName} ${person.lastName}`,
        role: membership.role.type,
        tenant: membership.tenant.name
      }
    }
  }
}
