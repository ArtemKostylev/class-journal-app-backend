const bcrypt = require("bcryptjs");
const { countReset } = require("console");
const { ENETUNREACH } = require("constants");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");
const readline = require("readline");

const addStudent = async (parent, args, context, info) => {
  const newStudent = await context.prisma.student.create({
    data: {
      name: args.name,
      surname: args.surname,
      courseId: args.courseId,
      teacherId: args.teacherId,
    },
  });
  return newStudent;
};

const signup = async (parent, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const signin = async (parent, args, context, info) => {
  const user = await context.prisma.user.findUnique({
    where: { login: args.login },
    include: {
      teacher: {
        include: {
          relations: {
            distinct: ["courseId"],
            select: {
              course: true,
            },
          },
        },
      },
    },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const updateJournal = async (parent, args, context, info) => {
  const { userId } = context;
  const { updateCasual, updatePeriod, deleteCasual, deletePeriod } = args.data;

  const updatedEntries = updateCasual.map(async (entry) => {
    return await context.prisma.journalEntry.upsert({
      where: {
        id: entry.id,
      },
      update: {
        mark: entry.mark,
        date: entry.date,
      },
      create: {
        mark: entry.mark,
        date: entry.date,
        relationId: entry.relationId,
      },
    });
  });

  let ids = deleteCasual.map((id) => parseInt(id));

  const deleteRepl = context.prisma.replacement.deleteMany({
    where: {
      entryId: {
        in: ids,
      },
    },
  });
  const deleteMark = context.prisma.journalEntry.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  const transaction = await context.prisma.$transaction([
    deleteRepl,
    deleteMark,
  ]);

  const updatedQuaters = updatePeriod.map(async (mark) => {
    return await context.prisma.quaterMark.upsert({
      where: {
        id: mark.id,
      },
      update: {
        mark: mark.mark,
      },
      create: {
        mark: mark.mark,
        period: mark.period,
        relationId: mark.relationId,
      },
    });
  });

  let qids = deletePeriod.map((id) => parseInt(id));

  let res = await context.prisma.quaterMark.deleteMany({
    where: {
      id: {
        in: qids,
      },
    },
  });
};

const updateTeacher = async (parent, args, context, info) => {
  return await context.prisma.teacher.update({
    where: {
      id: args.data.id,
    },
    data: {
      name: args.data.name,
      surname: args.data.surname,
      parent: args.data.parent,
    },
  });
};

const deleteTeacher = async (parent, args, context, info) => {
  await context.prisma.teacher.delete({
    where: {
      id: args.id,
    },
  });
};

const createStudent = async (parent, args, context, info) => {
  await context.prisma.student.create({
    data: {
      name: args.data.name,
      surname: args.data.surname,
      class: parseInt(args.data.class),
      program: args.data.program,
    },
  });
};

const createTeacher = async (parent, args, context, info) => {
  await context.prisma.teacher.create({
    data: {
      name: args.data.name,
      surname: args.data.surname,
      parent: args.parent,
    },
  });
};

const createCourse = async (parent, args, context, info) => {
  await context.prisma.course.create({
    data: {
      name: args.data.name,
      group: args.data.group,
    },
  });
};

const updateStudent = async (parent, args, context, info) => {
  return await context.prisma.student.update({
    where: {
      id: args.data.id,
    },
    data: {
      name: args.data.name,
      surname: args.data.surname,
      class: args.data.class,
      program: args.data.program,
    },
  });
};

const deleteStudent = async (parent, args, context, info) => {
  await context.prisma.student.delete({
    where: {
      id: args.id,
    },
  });
};

const updateCourse = async (parent, args, context, info) => {
  return await context.prisma.course.update({
    where: {
      id: args.data.id,
    },
    data: {
      name: args.data.name,
      group: args.data.group,
    },
  });
};

const deleteCourse = async (parent, args, context, info) => {
  await context.prisma.course.delete({
    where: {
      id: args.id,
    },
  });
};

const updateNote = async (parent, args, context, info) => {
  return await context.prisma.note.upsert({
    where: {
      id: args.data.id,
    },
    update: {
      text: args.data.text,
    },
    create: {
      text: args.data.text,
      year: args.data.year,
      teacherId: args.data.teacherId,
      courseId: args.data.courseId,
    },
  });
};

const deleteNote = async (parent, args, context, info) => {
  await context.prisma.course.delete({
    where: {
      id: args.id,
    },
  });
};

const updateReplacements = async (parent, args, context, info) => {
  return (updatedEntries = args.data.map((repl) => {
    return context.prisma.replacement.upsert({
      where: {
        id: repl.id,
      },
      update: {
        date: repl.date,
      },
      create: {
        date: repl.date,
        entryId: repl.entryId,
      },
    });
  }));
};

const deleteReplacements = async (parent, args, context, info) => {
  let ids = args.ids.map((id) => parseInt(id));

  let res = await context.prisma.replacement.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
};

const updateConsults = async (parent, args, context, info) => {
  return (updatedEntries = args.data.map((consult) => {
    return context.prisma.consult.upsert({
      where: {
        id: consult.id,
      },
      update: {
        date: consult.date,
        hours: consult.hours,
      },
      create: {
        date: consult.date,
        hours: consult.hours,
        relationId: consult.relationId,
        year: consult.year,
      },
    });
  }));
};

const deleteConsults = async (parent, args, context, info) => {
  let ids = args.ids.map((id) => parseInt(id));

  let res = await context.prisma.consult.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
};

const updateGroupConsults = async (parent, args, context, info) => {
  return (updatedEntries = args.data.map((group) => {
    group.consults.map(async (consult) => {
      console.log(consult);
      return await context.prisma.groupConsult.upsert({
        where: {
          id: consult.id,
        },
        update: {
          date: consult.date,
          hours: consult.hours,
        },
        create: {
          date: consult.date,
          year: consult.year,
          teacherId: args.teacher,
          courseId: args.course,
          hours: consult.hours,
          program: group.program,
          subgroup: group.subgroup,
          class: group.class,
        },
      });
    });
  }));
};

const deleteGroupConsults = async (parent, args, context, info) => {
  let ids = args.ids.map((id) => parseInt(id));

  let res = await context.prisma.groupConsult.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
};

const updateSubgroups = async (parent, args, context, info) => {
  return (updatedEntries = args.data.map((subgroup) => {
    return context.prisma.teacher_Course_Student.update({
      where: {
        id: subgroup.id,
      },
      data: {
        subgroup: subgroup.subgroup,
      },
    });
  }));
};

const updateCourseRelations = async (parent, args, context, info) => {
  //teacherID, [{courseId, archived}]

  console.log("input", args.courses);

  const archived = args.courses.filter((el) => el.archived);

  const pendingEntries = await context.prisma.teacher_Course_Student.findMany({
    where: {
      teacherId: args.teacher,
      courseId: { in: args.courses.map((item) => item.id) },
    },
  });
  console.log("pending", pendingEntries);

  const newCourses = args.courses.filter(
    (el) => 0 > pendingEntries.findIndex((entry) => el.id !== entry.CourseId)
  );

  console.log("new", newCourses);

  const createdEntries = newCourses.map(
    async (item) =>
      await context.prisma.teacher_Course_Student.create({
        data: {
          teacherId: args.teacher,
          courseId: item.id,
        },
      })
  );

  console.log("archived", archived);

  const updatedEntries = pendingEntries.map(async (entry) => {
    return await context.prisma.teacher_Course_Student.update({
      where: {
        id: entry.id,
      },
      data: {
        archived: !!archived.find((el) => el.id === entry.courseId),
      },
    });
  });
};

const updateStudentRelations = async (parent, args, context, info) => {
  console.log("input", args.students);

  const archived = args.students.filter((el) => el.archived);

  console.log("archived", archived);

  const newEmptyRelation = await context.prisma.teacher_Course_Student.findMany(
    {
      where: {
        teacherId: args.teacher,
        courseId: args.course,
        studentId: null,
      },
    }
  );

  console.log("empty", newEmptyRelation);

  const pendingEntries = await context.prisma.teacher_Course_Student.findMany({
    where: {
      teacherId: args.teacher,
      courseId: args.course,
      studentId: { in: args.students.map((item) => item.id) },
    },
  });

  console.log("pending", pendingEntries);

  const newStudents = args.students.filter(
    (el) =>
      -1 === pendingEntries.findIndex((entry) => el.id === entry.studentId)
  );

  console.log("new", newStudents);

  if (newEmptyRelation.length !== 0) {
    //we should add first n new students to empty relations. Actually, there should be no more than one empty relation.
    //so, we only update the studentId value of a relation, and discard this student from new students.
    await context.prisma.teacher_Course_Student.update({
      where: {
        id: newEmptyRelation[0].id,
      },
      data: {
        studentId: newStudents[0].id,
        archived: false,
      },
    });
    newStudents.splice(0, 1);
  }

  console.log("new after fill", newStudents);

  const createdEntries = newStudents.map(
    async (item) =>
      await context.prisma.teacher_Course_Student.create({
        data: {
          teacherId: args.teacher,
          courseId: args.course,
          studentId: item.id,
        },
      })
  );

  const updatedEntries = pendingEntries.map(async (entry) => {
    return await context.prisma.teacher_Course_Student.update({
      where: {
        id: entry.id,
      },
      data: {
        archived: !!archived.find((el) => el.id === entry.studentId),
      },
    });
  });
};

const uploadTeachersFromFile = async (oarent, args, context, info) => {
  const { createReadStream, filetype, mimetype, encoding } = await args.file;

  const stream = createReadStream();

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  let lines = [];

  for await (const line of rl) {
    const data = line.split(" ");
    if (data.length !== 3) throw new Error("Invalid file format");
    lines.push(data);
    console.log(data);
  }

  const currentEntries = await context.prisma.teacher.findMany();

  const created = lines.map(async (entry) => {
    if (
      -1 ===
      currentEntries.findIndex(
        (item) =>
          item.name === entry[0] &&
          item.surname === entry[1] &&
          item.parent === entry[2]
      )
    ) {
      await context.prisma.teacher.create({
        data: {
          name: entry[1],
          surname: entry[0],
          parent: entry[2] || "",
        },
      });
    }
  });

  return true;
};

const uploadCoursesFromFile = async (oarent, args, context, info) => {
  const { createReadStream, filetype, mimetype, encoding } = await args.file;

  const stream = createReadStream();

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  let lines = [];

  for await (const line of rl) {
    const data = line.split(" ");
    if (data.length !== 2) throw new Error("Invalid file format");
    lines.push(data);
    console.log(data);
  }

  const currentEntries = await context.prisma.course.findMany();

  const created = lines.map(async (entry) => {
    if (-1 === currentEntries.findIndex((item) => item.name === entry[0])) {
      await context.prisma.course.create({
        data: {
          name: entry[0],
          group: entry[1] === "+" ? true : false,
        },
      });
    }
  });

  return true;
};

const uploadStudentsFromFile = async (oarent, args, context, info) => {
  const { createReadStream, filetype, mimetype, encoding } = await args.file;

  const stream = createReadStream();

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  let lines = [];

  for await (const line of rl) {
    const data = line.split(" ");
    if (data.length !== 4) throw new Error("Invalid file format");
    lines.push(data);
  }

  const currentEntries = await context.prisma.student.findMany();

  const created = lines.map(async (entry) => {
    if (
      -1 ===
      currentEntries.findIndex(
        (item) => item.name === entry[0] && item.surname === entry[1]
      )
    ) {
      await context.prisma.student.create({
        data: {
          name: entry[1],
          surname: entry[0],
          class: parseInt(entry[2]),
          program: entry[3],
        },
      });
    }
  });

  return true;
};

module.exports = {
  addStudent,
  signin,
  signup,
  updateJournal,
  updateTeacher,
  deleteTeacher,
  updateCourse,
  deleteCourse,
  updateStudent,
  deleteStudent,
  updateNote,
  deleteNote,
  updateReplacements,
  deleteReplacements,
  updateConsults,
  deleteConsults,
  updateSubgroups,
  createTeacher,
  createCourse,
  createStudent,
  updateCourseRelations,
  updateStudentRelations,
  uploadTeachersFromFile,
  uploadCoursesFromFile,
  uploadStudentsFromFile,
  updateGroupConsults,
  deleteGroupConsults,
};
