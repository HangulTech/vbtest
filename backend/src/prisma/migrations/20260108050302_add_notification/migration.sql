/*
  Warnings:

  - You are about to drop the column `isActive` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the `Attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BoardingLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Device` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DriverAssignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DriverProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MovementEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParentStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Route` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RouteStop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SchoolProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentRoute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trip` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_personId_fkey";

-- DropForeignKey
ALTER TABLE "BoardingLog" DROP CONSTRAINT "BoardingLog_studentId_fkey";

-- DropForeignKey
ALTER TABLE "BoardingLog" DROP CONSTRAINT "BoardingLog_tripId_fkey";

-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "DriverAssignment" DROP CONSTRAINT "DriverAssignment_driverId_fkey";

-- DropForeignKey
ALTER TABLE "DriverAssignment" DROP CONSTRAINT "DriverAssignment_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "DriverProfile" DROP CONSTRAINT "DriverProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "MovementEvent" DROP CONSTRAINT "MovementEvent_personId_fkey";

-- DropForeignKey
ALTER TABLE "Parent" DROP CONSTRAINT "Parent_userId_fkey";

-- DropForeignKey
ALTER TABLE "ParentStudent" DROP CONSTRAINT "ParentStudent_parentId_fkey";

-- DropForeignKey
ALTER TABLE "ParentStudent" DROP CONSTRAINT "ParentStudent_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_userId_fkey";

-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "RouteStop" DROP CONSTRAINT "RouteStop_routeId_fkey";

-- DropForeignKey
ALTER TABLE "SchoolProfile" DROP CONSTRAINT "SchoolProfile_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_personId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "StudentRoute" DROP CONSTRAINT "StudentRoute_stopId_fkey";

-- DropForeignKey
ALTER TABLE "StudentRoute" DROP CONSTRAINT "StudentRoute_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_routeId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_tenantId_fkey";

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "isActive";

-- DropTable
DROP TABLE "Attendance";

-- DropTable
DROP TABLE "BoardingLog";

-- DropTable
DROP TABLE "Device";

-- DropTable
DROP TABLE "DriverAssignment";

-- DropTable
DROP TABLE "DriverProfile";

-- DropTable
DROP TABLE "MovementEvent";

-- DropTable
DROP TABLE "Parent";

-- DropTable
DROP TABLE "ParentStudent";

-- DropTable
DROP TABLE "Person";

-- DropTable
DROP TABLE "Route";

-- DropTable
DROP TABLE "RouteStop";

-- DropTable
DROP TABLE "SchoolProfile";

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "StudentRoute";

-- DropTable
DROP TABLE "Trip";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Vehicle";

-- DropEnum
DROP TYPE "AttendanceStatus";

-- DropEnum
DROP TYPE "PersonType";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
