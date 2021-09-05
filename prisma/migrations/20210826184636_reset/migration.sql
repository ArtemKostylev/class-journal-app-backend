/*
  Warnings:

  - A unique constraint covering the columns `[parentId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "excludeFromReport" BOOLEAN DEFAULT false,
ADD COLUMN     "onlyGroups" BOOLEAN DEFAULT false,
ADD COLUMN     "onlyHours" BOOLEAN DEFAULT false,
ADD COLUMN     "parentId" INTEGER;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "parent" TEXT;

-- CreateTable
CREATE TABLE "CourseHours" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER,
    "teacherId" INTEGER,
    "class" INTEGER,
    "program" "Program",
    "subgroup" INTEGER,
    "date" TIMESTAMP(3) NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_parentId_unique" ON "Course"("parentId");

-- AddForeignKey
ALTER TABLE "Course" ADD FOREIGN KEY ("parentId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseHours" ADD FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseHours" ADD FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
