const docx = require("docx");
const fs = require("fs");

const fetchJournal = async (parent, args, context) => {
  const { userId } = context;

  const dateGte = args.date_gte || `${args.year}-09-01T00:00:00.000Z`;
  const dateLte = args.date_lte || `${args.year + 1}-05-31T00:00:00.000Z`;

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
            gte: dateGte,
            lte: dateLte,
          },
        },
      },
      quaterMark: true,
      student: true,
    },
  });
  console.log("year", args.year);

  const hours = await context.prisma.teacher_Course_Student.findMany({
    where: {
      teacherId: args.teacherId,
      courseId: args.courseId,
    },
    select: {
      journalEntry: {
        where: {
          date: {
            gte: `${args.year}-09-01T00:00:00.000Z`,
            lte: `${args.year + 1}-05-31T00:00:00.000Z`,
          },
        },
      },
    },
  });

  console.log("hours", [...hours]);

  return students.map((student, index) => ({
    ...student,
    hours: hours[index].journalEntry.length,
  }));
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
  //TODO create empty tag for teacher;
  const teachers = await context.prisma.teacher.findMany();
  const students = await context.prisma.student.findMany();
  const courses = await context.prisma.course.findMany();
  const relations = await context.prisma.teacher_Course_Student.findMany({
    include: {
      teacher: true,
      student: true,
      course: true,
    },
  });
  return {
    teachers,
    students,
    courses,
    relations,
  };
};

const fetchGroupConsults = async (parent, args, context) => {
  const { userId } = context;

  let availableGroups = await context.prisma.teacher_Course_Student.findMany({
    where: {
      teacherId: args.teacherId,
      courseId: args.courseId,
      archived: false,
    },
    select: {
      subgroup: true,
      student: {
        select: {
          class: true,
          program: true,
        },
      },
    },
  });

  availableGroups = availableGroups.map(
    (item) =>
      `${item.student.class} ${item.student.program} ${item.subgroup || "..."}`
  );

  const consultsAll = await context.prisma.groupConsult.findMany({
    where: {
      teacherId: args.teacherId,
      courseId: args.courseId,
      year: args.year,
    },
  });

  let consultsByGroups = new Map();

  consultsAll.forEach((item) => {
    const key = `${item.class} ${item.program} ${item.subgroup || "..."}`;

    const value = {
      id: item.id,
      date: item.date,
      hours: item.hours,
    };

    if (consultsByGroups.has(key))
      consultsByGroups.set(key, consultsByGroups.get(key).push(value));
    consultsByGroups.set(key, [value]);
  });

  return availableGroups.map((group) => {
    if (consultsByGroups.has(group))
      return { group, consults: consultsByGroups.get(group) };
    return { group, consults: [] };
  });
};

const fetchAnnualReport = async (parent, args, context) => {
  const FILE_LOCATION = "";
  const dateGte = `${args.year}-09-01T00:00:00.000Z`;
  const dateLte = `${args.year + 1}-05-31T00:00:00.000Z`;

  const data = await context.prisma.teacher_Course_Student.findMany({
    where: {
      archived: false,
    },
    select: {
      quaterMark: {
        where: {
          year: args.year,
        },
      },
      quaterMark: true,
      student: {
        inlude: {
          specialization: true,
        },
      },
      course: true,
    },
  });

  //TODO sort the data first
  console.log("data unsorted", data);

  //const doc = new docx.Document({});
  return FILE_LOCATION;
};

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
  fetchGroupConsults,
  fetchAnnualReport,
};
