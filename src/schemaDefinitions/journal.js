const gql = require("graphql-tag");

const typeDef = gql`
  type Teacher_Course_Student {
    id: Int!
    teacher: Teacher!
    course: Course!
    student: Student
    subgroup: Int
    journalEntry: [JournalEntry]
    quarterMark: [QuarterMark]
    consult: [Consult]
    archived: Boolean
    hours: Int
  }

  type JournalEntry {
    id: Int!
    mark: String!
    date: Date!
    relation: Teacher_Course_Student
    replacement: Replacement
  }

  type QuarterMark {
    id: Int!
    mark: String!
    period: String!
    relation: Teacher_Course_Student
    year: Int
  }

  extend type Query {
    fetchJournal(
      teacherId: Int!
      courseId: Int!
      year: Int!
      date_gte: Date
      date_lte: Date
    ): [Teacher_Course_Student]
  }

  extend type Mutation {
    updateJournal(data: JournalUpdateInput): Boolean
  }

  input JournalEntryInput {
    id: Int
    mark: String!
    date: Date!
    relationId: Int!
  }

  input Teacher_Course_StudentInput {
    id: Int
    teacherId: Int
    courseId: Int
    studentId: Int
  }
  input QuarterMarkInput {
    id: Int
    mark: String!
    period: String!
    relationId: Int!
    year: Int
  }

  input JournalUpdateInput {
    updateCasual: [JournalEntryInput]
    updatePeriod: [QuarterMarkInput]
    deleteCasual: [Int]
    deletePeriod: [Int]
  }
`;

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

module.exports(typeDef);
