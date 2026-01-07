-- CreateTable
CREATE TABLE "MovementEvent" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "location" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovementEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MovementEvent_studentId_timestamp_idx" ON "MovementEvent"("studentId", "timestamp");

-- AddForeignKey
ALTER TABLE "MovementEvent" ADD CONSTRAINT "MovementEvent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
