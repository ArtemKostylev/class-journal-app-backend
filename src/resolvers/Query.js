const fetchJournal = async (parent, args, context) => {
  const { userId } = context;

  const students = await context.prisma.teacher_Course_Student.findMany({
    where: {
      teacherId: args.teacherId,
      courseId: args.courseId,
    },
    include: {
      journalEntry: {
        orderBy: {
          date: "asc",
        },
        where: {
          date: {
            gte: args.date_gte,
            lte: args.date_lte,
          },
        },
      },
      quaterMark: true,
      student: true,
    },
  });

  return students;
};

const fetchTeachers = async (parent, args, context) => {
  const { userId } = context;
  return await context.prisma.teacher.findMany({
    include: {
      relations: {
        distinct: ["courseId"],
        select: {
          course: true,
        },
      },
    },
  });
};

const fetchStudents = async (parent, args, context) => {
  const { userId } = context;
  return await context.prisma.student.findMany();
};

const fetchCourses = async (parent, args, context) => {
  const { userId } = context;
  return await context.prisma.course.findMany();
};

const fetchNotes = async (parent, args, context) => {
  const { userId } = context;
  return await context.prisma.note.findFirst({
    where: {
      courseId: args.courseId,
      teacherId: args.teacherId,
      year: args.year,
      period: args.period,
    },
  });
};

const fetchReplacements = async (parent, args, context) => {
  const { userId } = context;
  return await context.prisma.teacher_Course_Student.findMany({
    where: {
      teacherId: args.teacherId,
      courseId: args.courseId,
    },
    include: {
      journalEntry: {
        orderBy: {
          date: "asc",
        },
        where: {
          date: {
            gte: args.date_gte,
            lte: args.date_lte,
          },
          mark: {
            in: ["Б"],
          },
        },
        include: {
          replacement: true,
        },
      },
      student: true,
    },
  });
};

const fetchConsults = async (parent, args, context) => {
  const { userId } = context;
  return await context.prisma.teacher_Course_Student.findMany({
    where: {
      teacherId: args.teacherId,
      courseId: args.courseId,
    },
    include: {
      consult: {
        orderBy: {
          date: "asc",
        },
        where: {
          period: {
            in: args.period,
          },
          year: args.year,
        },
      },
      student: true,
    },
  });
};

const fetchSubgroups = async (parent, args, context) => {
  const { userId } = context;
  let students = await context.prisma.teacher_Course_Student.findMany({
    where: {
      teacherId: args.teacherId,
      courseId: args.courseId,
    },
    include: {
      student: true,
    },
  });

  let groups = [];
  let classes = [];
  let programs = [];
  let subgroups = [];
  let groupedData = [];

  students.forEach((item) => {
    classes.push(item.student.class);
    programs.push(item.student.program);
  });

  classes = [...new Set(classes)];
  programs = [...new Set(programs)];

  classes.forEach((num) => {
    programs.forEach((program) => {
      groups.push({
        class: num,
        program: program,
        relations: [],
      });
    });
  });

  students.forEach((item) => {
    let index = groups.findIndex(
      (group) =>
        item.student.class === group.class &&
        item.student.program === group.program
    );
    groups[index].relations.push(item);
  });

  groups.forEach((group) => {
    if (group.relations.length > 0) groupedData.push(group);
  });

  return groupedData;
};

const fetchFullInfo = async (parent, args, context) => {
  const { userId } = context;
  const teachers = await context.prisma.teacher.findMany();
  const students = await context.prisma.student.findMany();
  const courses = await context.prisma.course.findMany();
  const relations = await context.prisma.teacher_Course_Student.findMany();
  return {
    teachers,
    students,
    courses,
    relations,
  }
}

module.exports = {
  fetchJournal,
  fetchTeachers,
  fetchCourses,
  fetchStudents,
  fetchNotes,
  fetchReplacements,
  fetchConsults,
  fetchSubgroups,
  fetchFullInfo,
};
