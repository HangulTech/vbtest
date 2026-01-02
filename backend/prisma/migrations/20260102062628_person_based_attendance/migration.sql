/*
  Warnings:

  - You are about to drop the column `studentId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `MovementEvent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[personId,date]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `personId` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personId` to the `MovementEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_studentId_fkey";

-- DropForeignKey
ALTER TABLE "MovementEvent" DROP CONSTRAINT "MovementEvent_studentId_fkey";

-- DropIndex
DROP INDEX "Attendance_studentId_date_key";

-- DropIndex
DROP INDEX "MovementEvent_studentId_timestamp_idx";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "studentId",
ADD COLUMN     "personId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MovementEvent" DROP COLUMN "studentId",
ADD COLUMN     "personId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "personId" TEXT;

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT,
    "type" TEXT NOT NULL,
    "refId" TEXT,
    "rfidTag" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_rfidTag_key" ON "Person"("rfidTag");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_personId_date_key" ON "Attendance"("personId", "date");

-- CreateIndex
CREATE INDEX "MovementEvent_personId_timestamp_idx" ON "MovementEvent"("personId", "timestamp");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovementEvent" ADD CONSTRAINT "MovementEvent_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
