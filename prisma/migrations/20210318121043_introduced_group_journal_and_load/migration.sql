/*
  Warnings:

  - You are about to drop the column `hours` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `setById` on the `JournalEntry` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Student` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `QuaterMark` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Program" AS ENUM ('PP_5', 'PP_8', 'OP');

-- DropForeignKey
ALTER TABLE "JournalEntry" DROP CONSTRAINT "JournalEntry_setById_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_teacherId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "hours";

-- AlterTable
ALTER TABLE "JournalEntry" DROP COLUMN "setById",
ADD COLUMN     "teacherId" INTEGER,
ADD COLUMN     "courseId" INTEGER;

-- AlterTable
ALTER TABLE "QuaterMark" ADD COLUMN     "teacherId" INTEGER,
ADD COLUMN     "courseId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "courseId",
DROP COLUMN "teacherId",
ADD COLUMN     "class" INTEGER,
ADD COLUMN     "program" "Program";

-- CreateTable
CREATE TABLE "Load" (
    "id" SERIAL NOT NULL,
    "course" INTEGER NOT NULL,
    "class" INTEGER NOT NULL,
    "program" "Program" NOT NULL,
    "hours" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CourseToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_StudentToTeacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseToTeacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToStudent_AB_unique" ON "_CourseToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToStudent_B_index" ON "_CourseToStudent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentToTeacher_AB_unique" ON "_StudentToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentToTeacher_B_index" ON "_StudentToTeacher"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToTeacher_AB_unique" ON "_CourseToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToTeacher_B_index" ON "_CourseToTeacher"("B");

-- AddForeignKey
ALTER TABLE "_CourseToStudent" ADD FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToStudent" ADD FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToTeacher" ADD FOREIGN KEY ("A") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToTeacher" ADD FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToTeacher" ADD FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToTeacher" ADD FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuaterMark" ADD FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuaterMark" ADD FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
