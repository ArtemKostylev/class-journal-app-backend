-- AlterTable
ALTER TABLE "Consult" ADD COLUMN     "teacherId" INTEGER;

-- AddForeignKey
ALTER TABLE "Consult" ADD FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
