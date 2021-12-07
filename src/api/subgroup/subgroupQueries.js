import { buildGroups } from '../../utils';

const fetchSubgroups = async (parent, args, context) => {
  let students = await context.prisma.teacher_Course_Student.findMany({
    where: {
      teacherId: args.teacherId,
      courseId: args.courseId,
    },
    select: {
      id: true,
      student: true,
      subgroup: true,
    },
  });

  return buildGroups(
    students,
    (item) => `${item.student.class} ${item.student.program}`,
    (item) => ({
      relation: item.id,
      name: item.student.name,
      surname: item.student.surname,
      subgroup: item.subgroup,
    }),
    'relations'
  );
};

module.exports = {
  fetchSubgroups,
};
