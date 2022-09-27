import {Course, FreezeVersion, PrismaClient, Specialization, Student, Teacher, Teacher_Course_Student} from '@prisma/client';

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

async function main() {
  const freezeVersion = await prisma.freezeVersion.create({
    data: {
      year: 2021
    }
  })

  const updatedStudents: Student[] = await updateRecords(freezeVersion, prisma.student);
  const updatedTeachers: Teacher[] = await updateRecords(freezeVersion, prisma.teacher);
  const updatedCourses: Course[] = await updateRecords(freezeVersion, prisma.course);
  const updatedRelations: Teacher_Course_Student[] = await updateRecords(freezeVersion, prisma.teacher_Course_Student, 'archived');
  const updatedSpecs: Specialization[] = await updateRecords(freezeVersion, prisma.specialization);

  const studMap = new Map(updatedStudents.map(it => [it.id, it]))
  const teacherMap = new Map(updatedTeachers.map(it => [it.id, it]))
  const courseMap = new Map(updatedCourses.map(it => [it.id, it]))
  const relMap = new Map(updatedRelations.map(it => [it.id, it]))
  const specMap = new Map(updatedSpecs.map(it => [it.id, it]))

  await prisma.specialization.createMany({
    data: updatedSpecs.map(it => ({
      name: it.name,
      previousId: it.id
    }))
  })

  const newSpecs = await prisma.specialization.findMany({
    where: {
      freezeVersionId: null
    }
  })

  const newSpecsMap = new Map(newSpecs.map(it => [it.previousId, it]))

  await prisma.student.createMany({
    data: updatedStudents.map(it => ({
      name: it.name,
      surname: it.surname,
      class: it.class,
      program: it.program,
      specializationId: newSpecsMap.get(it.specializationId)?.id,
      previousId: it.id
    }))
  })

  const newStudents = await prisma.student.findMany({
    where: {
      freezeVersionId: null
    }
  })

  const newStudentsMap = new Map(newStudents.map(it => [it.previousId, it]))

  await prisma.teacher.createMany({
    data: updatedTeachers.map(it => ({
      name: it.name,
      surname: it.surname,
      parent: it.parent,
      userId: it.userId,
      previousId: it.id
    }))
  })

  const newTeachers = await prisma.teacher.findMany({
    where: {
      freezeVersionId: null
    }
  })

  const newTeachersMap = new Map(newTeachers.map(it => [it.previousId, it]))

  await prisma.course.createMany({
    data: updatedCourses.map(it => ({
      name: it.name,
      group: it.group,
      excludeFromReport: it.excludeFromReport,
      onlyGroups: it.onlyGroups,
      onlyHours: it.onlyHours,
      previousId: it.previousId
    }))
  })

  const newCourses = await prisma.course.findMany({
    where: {
      freezeVersionId: null
    }
  })

  const newCoursesMap = new Map(newCourses.map(it => [it.previousId, it]))

  return await prisma.teacher_Course_Student.createMany({
    data: updatedRelations.map(it => ({
      teacherId: newTeachersMap.get(it.teacherId)?.id || 0,
      studentId: newStudentsMap.get(it.studentId)?.id || 0,
      courseId: newCoursesMap.get(it.courseId)?.id || 0,
      subgroup: it.subgroup,
      previousId: it.id
    }))

  });
}

main().then(res => console.log(res))