-- AlterTable
ALTER TABLE "Consult" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "freezeVersionId" INTEGER,
ADD COLUMN     "previousId" INTEGER;

-- AlterTable
ALTER TABLE "CourseHours" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "GroupConsult" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "JournalEntry" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Load" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "QuaterMark" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Replacement" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Specialization" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "freezeVersionId" INTEGER,
ADD COLUMN     "previousId" INTEGER;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "freezeVersionId" INTEGER,
ADD COLUMN     "previousId" INTEGER;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "freezeVersionId" INTEGER,
ADD COLUMN     "previousId" INTEGER;

-- AlterTable
ALTER TABLE "Teacher_Course_Student" ADD COLUMN     "freezeVersionId" INTEGER,
ADD COLUMN     "previousId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "FreezeVersion" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Teacher" ADD FOREIGN KEY ("freezeVersionId") REFERENCES "FreezeVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD FOREIGN KEY ("freezeVersionId") REFERENCES "FreezeVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD FOREIGN KEY ("freezeVersionId") REFERENCES "FreezeVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher_Course_Student" ADD FOREIGN KEY ("freezeVersionId") REFERENCES "FreezeVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Specialization" ADD FOREIGN KEY ("freezeVersionId") REFERENCES "FreezeVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
