/*
  Warnings:

  - You are about to drop the column `studentId` on the `Consult` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Consult` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Consult` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `JournalEntry` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `JournalEntry` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `JournalEntry` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `QuaterMark` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `QuaterMark` table. All the data in the column will be lost.
  - You are about to drop the `_CourseToStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CourseToTeacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StudentToTeacher` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `relationId` to the `Consult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relationId` to the `JournalEntry` table without a default value. This is not possible if the table is not empty.
  - Made the column `teacherId` on table `Note` required. The migration will fail if there are existing NULL values in that column.
  - Added the required column `relationId` to the `QuaterMark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CourseToStudent" DROP CONSTRAINT "_CourseToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToStudent" DROP CONSTRAINT "_CourseToStudent_B_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToTeacher" DROP CONSTRAINT "_CourseToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToTeacher" DROP CONSTRAINT "_CourseToTeacher_B_fkey";

-- DropForeignKey
ALTER TABLE "_StudentToTeacher" DROP CONSTRAINT "_StudentToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudentToTeacher" DROP CONSTRAINT "_StudentToTeacher_B_fkey";

-- DropForeignKey
ALTER TABLE "Consult" DROP CONSTRAINT "Consult_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Consult" DROP CONSTRAINT "Consult_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Consult" DROP CONSTRAINT "Consult_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "JournalEntry" DROP CONSTRAINT "JournalEntry_courseId_fkey";

-- DropForeignKey
ALTER TABLE "JournalEntry" DROP CONSTRAINT "JournalEntry_studentId_fkey";

-- DropForeignKey
ALTER TABLE "JournalEntry" DROP CONSTRAINT "JournalEntry_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "QuaterMark" DROP CONSTRAINT "QuaterMark_courseId_fkey";

-- DropForeignKey
ALTER TABLE "QuaterMark" DROP CONSTRAINT "QuaterMark_studentId_fkey";

-- DropForeignKey
ALTER TABLE "QuaterMark" DROP CONSTRAINT "QuaterMark_teacherId_fkey";

-- AlterTable
ALTER TABLE "Consult" DROP COLUMN "studentId",
DROP COLUMN "courseId",
DROP COLUMN "teacherId",
ADD COLUMN     "relationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "JournalEntry" DROP COLUMN "studentId",
DROP COLUMN "teacherId",
DROP COLUMN "courseId",
ADD COLUMN     "relationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "teacherId" SET NOT NULL;

-- AlterTable
ALTER TABLE "QuaterMark" DROP COLUMN "studentId",
DROP COLUMN "teacherId",
ADD COLUMN     "relationId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Teacher_Course_Student" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "_CourseToStudent";

-- DropTable
DROP TABLE "_CourseToTeacher";

-- DropTable
DROP TABLE "_StudentToTeacher";

-- AddForeignKey
ALTER TABLE "Teacher_Course_Student" ADD FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher_Course_Student" ADD FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher_Course_Student" ADD FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consult" ADD FOREIGN KEY ("relationId") REFERENCES "Teacher_Course_Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD FOREIGN KEY ("relationId") REFERENCES "Teacher_Course_Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuaterMark" ADD FOREIGN KEY ("relationId") REFERENCES "Teacher_Course_Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
