/*
  Warnings:

  - You are about to drop the column `replacement` on the `JournalEntry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JournalEntry" DROP COLUMN "replacement";

-- CreateTable
CREATE TABLE "Replacement" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "teacherId" INTEGER,
    "studentId" INTEGER,
    "courseId" INTEGER NOT NULL,
    "entryId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Replacement_entryId_unique" ON "Replacement"("entryId");

-- AddForeignKey
ALTER TABLE "Replacement" ADD FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Replacement" ADD FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Replacement" ADD FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Replacement" ADD FOREIGN KEY ("entryId") REFERENCES "JournalEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
