const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

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
      class: args.data.class,
      program: args.data.program,
    },
  });
};

const createTeacher = async (parent, args, context, info) => {
  await context.prisma.teacher.create({
    data: {
      name: args.data.name,
      surname: args.data.surname,
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
      period: args.data.period,
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
      },
      create: {
        date: consult.date,
        period: consult.period,
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
};
