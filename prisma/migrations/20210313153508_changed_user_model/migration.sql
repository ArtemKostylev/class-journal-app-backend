-- AlterTable
ALTER TABLE "JournalEntry" ALTER COLUMN "setById" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "courseId" DROP NOT NULL,
ALTER COLUMN "teacherId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "userId" DROP NOT NULL;
