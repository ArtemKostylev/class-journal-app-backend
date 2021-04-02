/*
  Warnings:

  - You are about to drop the column `courseId` on the `QuaterMark` table. All the data in the column will be lost.
  - You are about to drop the `Subgroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subgroup" DROP CONSTRAINT "Subgroup_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Subgroup" DROP CONSTRAINT "Subgroup_studentId_fkey";

-- AlterTable
ALTER TABLE "QuaterMark" DROP COLUMN "courseId";

-- AlterTable
ALTER TABLE "Teacher_Course_Student" ADD COLUMN     "subgroup" INTEGER;

-- DropTable
DROP TABLE "Subgroup";
