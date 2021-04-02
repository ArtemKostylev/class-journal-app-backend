-- CreateEnum
CREATE TYPE "Period" AS ENUM ('first', 'second', 'third', 'fourth', 'year');

-- AlterTable
ALTER TABLE "JournalEntry" ADD COLUMN     "replacement" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "QuaterMark" (
    "id" SERIAL NOT NULL,
    "mark" TEXT NOT NULL,
    "period" "Period" NOT NULL,
    "studentId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuaterMark" ADD FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
