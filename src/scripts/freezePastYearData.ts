import {Course, FreezeVersion, PrismaClient, Specialization, Student, Teacher, Teacher_Course_Student, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

async function updateRecords(freezeVersion: FreezeVersion, client: any, softDeleteKey = 'deleted') {

  await client.updateMany({
    where: {
      freezeVersionId: null,
    },
    data: {
      freezeVersionId: freezeVersion.id
    }
  });

  return await client.findMany({
    where: {
      freezeVersionId: freezeVersion.id,
      [softDeleteKey]: false
    }
  })

}

const main = async (tx: Prisma.TransactionClient) => {
  const freezeVersion = await tx.freezeVersion.create({
    data: {
      year: 2021
    }
  })

  const updatedStudents: Student[] = await updateRecords(freezeVersion, tx.student);
  const updatedTeachers: Teacher[] = await updateRecords(freezeVersion, tx.teacher);
  const updatedCourses: Course[] = await updateRecords(freezeVersion, tx.course);
  const updatedRelations: Teacher_Course_Student[] = await updateRecords(freezeVersion, tx.teacher_Course_Student, 'archived');
  const updatedSpecs: Specialization[] = await updateRecords(freezeVersion, tx.specialization);

  await tx.teacher.updateMany({
    data: {
      userId: null
    }
  });

  await tx.specialization.createMany({
    data: updatedSpecs.map(it => ({
      name: it.name,
      previousId: it.id
    }))
  })

  const newSpecs = await tx.specialization.findMany({
    where: {
      freezeVersionId: null
    }
  })

  const newSpecsMap = new Map(newSpecs.map(it => [it.previousId, it]))

  await prisma.student.createMany({
    data: updatedStudents.map(it => {
      const result: Record<string, any> = {
        name: it.name,
        surname: it.surname,
        class: it.class,
        program: it.program,
        previousId: it.id
      }

      const spec = newSpecsMap.get(it.specializationId)?.id;

      if (spec) result.specializationId = spec;

      console.log(result);

      return result;
    })
  })

  const newStudents = await tx.student.findMany({
    where: {
      freezeVersionId: null
    }
  })

  const newStudentsMap = new Map(newStudents.map(it => [it.previousId, it]))

  await tx.teacher.createMany({
    data: updatedTeachers.map(it => ({
      name: it.name,
      surname: it.surname,
      parent: it.parent,
      userId: it.userId,
      previousId: it.id
    }))
  })

  const newTeachers = await tx.teacher.findMany({
    where: {
      freezeVersionId: null
    }
  })

  const newTeachersMap = new Map(newTeachers.map(it => [it.previousId, it]))

  await tx.course.createMany({
    data: updatedCourses.map(it => ({
      name: it.name,
      group: it.group,
      excludeFromReport: it.excludeFromReport,
      onlyGroups: it.onlyGroups,
      onlyHours: it.onlyHours,
      previousId: it.previousId
    }))
  })

  const newCourses = await tx.course.findMany({
    where: {
      freezeVersionId: null
    }
  })

  const newCoursesMap = new Map(newCourses.map(it => [it.previousId, it]))

  return await tx.teacher_Course_Student.createMany({
    data: updatedRelations.map(it => ({
      teacherId: newTeachersMap.get(it.teacherId)?.id || 0,
      studentId: newStudentsMap.get(it.studentId)?.id || 0,
      courseId: newCoursesMap.get(it.courseId)?.id || 0,
      subgroup: it.subgroup,
      previousId: it.id
    }))

  });
}

prisma.$transaction(main).then(res => console.log(res))