import { PrismaClient, PersonType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // -------------------------
  // TENANT
  // -------------------------
  let tenant = await prisma.tenant.findFirst({
    where: { name: 'EduHan Demo School' }
  });

  if (!tenant) {
    tenant = await prisma.tenant.create({
      data: {
        name: 'EduHan Demo School',
        isActive: true
      }
    });
  }

  // -------------------------
  // PERSON
  // -------------------------
  let person = await prisma.person.findFirst({
    where: { rfidTag: 'RFID-STU-001' }
  });

  if (!person) {
    person = await prisma.person.create({
      data: {
        tenantId: tenant.id,
        type: PersonType.STUDENT,
        rfidTag: 'RFID-STU-001',
        isActive: true
      }
    });
  }

  // -------------------------
  // STUDENT
  // -------------------------
  const existingStudent = await prisma.student.findFirst({
    where: { personId: person.id }
  });

  if (!existingStudent) {
    await prisma.student.create({
      data: {
        tenantId: tenant.id,
        personId: person.id,
        fullName: 'Demo Student',
        rmfId: 'EDU25ABC001',
        isActive: true
      }
    });
  }

  console.log('✅ Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
