// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.role.createMany({
    data: [
      { type: 'PLATFORM_ADMIN' },
      { type: 'SCHOOL_ADMIN' },
      { type: 'TEACHER' },
      { type: 'STUDENT' },
      { type: 'PARENT' },
      { type: 'PUBLIC_INSTRUCTOR' }
    ],
    skipDuplicates: true
  })
}

main()
