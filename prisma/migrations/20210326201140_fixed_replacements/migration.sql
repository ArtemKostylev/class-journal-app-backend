/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Replacement` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Replacement` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Replacement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Replacement" DROP CONSTRAINT "Replacement_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Replacement" DROP CONSTRAINT "Replacement_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Replacement" DROP CONSTRAINT "Replacement_teacherId_fkey";

-- AlterTable
ALTER TABLE "Replacement" DROP COLUMN "teacherId",
DROP COLUMN "studentId",
DROP COLUMN "courseId";
