const { group } = require("console");
const {
  TableCell,
  Paragraph,
  Packer,
  Table,
  Document,
  TableRow,
  WidthType,
  PageOrientation,
} = require("docx");
const docx = require("docx");
const fs = require("fs");
const times = require("lodash/times");
const { buildHtml } = require("./helpers/htmlBuilder");
const htmlDocx = require("html-docx-js");

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
  const teachers = await context.prisma.teacher.findMany();
  const students = await context.prisma.student.findMany({
    include: {
      specialization: true,
    },
  });
  const courses = await context.prisma.course.findMany();
  const specializations = await context.prisma.specialization.findMany();
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
    specializations,
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

const fetchGroupCompany = async (parent, args, context) => {
  // args: teacherId, courseId
  // 1. Get corresponding course from DB
  const course = await context.prisma.course.findUnique({
    where: {
      id: args.courseId,
    },
    select: {
      parentId: true,
    },
  });
  // 2. Get all relations of corresponding course
  const relations = await context.prisma.teacher_Course_Student.findMany({
    where: {
      courseId: course.parentId,
    },
    select: {
      student: {
        select: {
          class: true,
          program: true,
        },
      },
      subgroup: true,
    },
  });
  // 3. Create groups from corr relations
  const groups = new Set(
    relations.map((item) => {
      return `${item.student.class} ${item.student.program} ${
        item.subgroup | "..."
      }`;
    })
  );
  // 4. Get all Hour data based on created groups
  const hours = await context.prisma.courseHours.findMany({
    where: {
      courseId: args.courseId,
      teacherId: args.teacherId,
    },
    select: {
      class: true,
      program: true,
      subgroup: true,
      date: true,
      hours: true,
    },
  });
  // 5. return Hour data
  const result = new Map();
  hours.forEach((item) => {
    const key = `${item.class} ${item.program} ${item.subgroup | "..."}`;
    const value = {
      id: item.id,
      date: item.date,
      hours: item.hours,
    };
    if (result.has(key)) {
      result.set(key, result.get(key).push(value));
    } else {
      result.set(key, [value]);
    }
  });

  return groups.map((group) => {
    if (result.has(group)) return { group: group, hours: result.get(group) };
    return { group: group, hours: [] };
  });
};

const fetchSpecialization = async (parent, args, context) => {
  const { userId } = context;
  return await context.prisma.specialization.findMany();
};

const fetchAnnualReport = async (parent, args, context) => {
  const FILE_LOCATION = "";

  const data = await context.prisma.teacher_Course_Student.findMany({
    where: {
      archived: false,
      course: {
        excludeFromReport: false,
      },
    },
    select: {
      quaterMark: {
        where: {
          year: args.year,
        },
      },
      student: {
        include: {
          specialization: true,
        },
      },
      course: true,
    },
  });

  const mappedData = new Map();

  data.forEach((item) => {
    const key = `${item.student.class}/${
      item.student.specialization?.name || null
    }/${item.student.program === "OP" ? "OP" : "PP"}`;

    mappedData.set(
      key,
      mappedData.get(key) ? [...mappedData.get(key), item] : [item]
    );
  });

  //students map

  mappedData.forEach((value, key) => {
    let courses = new Map();

    value.forEach((it) => courses.set(it.course.id, it.course.name));

    courses = Array.from(courses, ([name, value]) => ({
      id: name,
      name: value,
    }));

    const studentMarks = new Map();

    value.forEach((it) => {
      const key = `${it.student.name} ${it.student.surname}`;
      studentMarks.set(
        key,
        studentMarks.get(key)
          ? [
              ...studentMarks.get(key),
              { courseId: it.course.id, marks: it.quaterMark },
            ]
          : [{ courseId: it.course.id, marks: it.quaterMark }]
      );
    });

    mappedData.set(key, { courses, studentMarks });
  });

  const doc = buildHtml(mappedData);

  const docx = htmlDocx.asBlob(doc, { orientation: "landscape" });

  fs.writeFile(`/var/www/files/vedomost_${args.year}.docx`, docx, function (err) {
    if (err) throw err;
  });

  return `https://akostylev.con/files/vedomost_${args.year}.docx`;
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
  fetchGroupCompany,
  fetchAnnualReport,
  fetchSpecialization,
};
