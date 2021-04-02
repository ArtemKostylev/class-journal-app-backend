-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "period" "Period" NOT NULL,
    "year" INTEGER NOT NULL,
    "teacherId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
