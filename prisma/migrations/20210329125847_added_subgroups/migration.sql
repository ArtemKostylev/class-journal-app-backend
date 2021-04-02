-- CreateTable
CREATE TABLE "Subgroup" (
    "courseId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "subgroup" INTEGER NOT NULL,

    PRIMARY KEY ("courseId","studentId")
);

-- AddForeignKey
ALTER TABLE "Subgroup" ADD FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subgroup" ADD FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
