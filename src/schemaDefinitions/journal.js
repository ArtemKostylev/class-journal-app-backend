const gql = require("graphql-tag");
const { buildGroups } = require("../utils");

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

  type DatesByGroup {
    group: String!
    students: [Date!]!
  }

  type ClassJournal {
    dates: [DatesByGroup]
    students: [Teacher_Course_Student]
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
      type: String!
    ): [ClassJournal]
  }

  extend type Mutation {
    updateDailyEntry(
      id: Int!
      date: String!
      relationId: Int!
      mark: String!
    ): Boolean
    updateQuarterEntry(
      id: Int!
      period: String!
      relationId: Int!
      mark: String!
      year: Int!
    ): Boolean
    deleteEntry(type: MarkTypes!, id: Int!): Boolean
  }

  input Teacher_Course_StudentInput {
    id: Int
    teacherId: Int
    courseId: Int
    studentId: Int
  }
`;

const MARK_TYPES = {
  DAILY_MARK: "daily",
  QUARTER_MARK: "quarter",
};

const QUERY_TYPES = {
  INDIVIDUAL: "individual",
  GROUP: "group",
};

const resolvers = {
  updateDailyEntry: async (parent, args, context, info) => {
    await context.prisma.journalEntry.upsert({
      where: {
        id: args.id,
      },
      update: {
        mark: args.mark,
        date: args.date,
      },
      create: {
        mark: args.mark,
        date: args.date,
        relationId: args.relationId,
      },
    });
  },
  updateQuarterEntry: async (parent, args, context, info) => {
    await context.prisma.quarterMark.upsert({
      where: {
        id: args.id,
      },
      update: {
        mark: args.mark,
      },
      create: {
        mark: args.mark,
        period: args.date,
        year: args.year,
        relationId: args.relationId,
      },
    });
  },
  deleteEntry: async (parent, args, context, info) => {
    const model =
      args.type === MARK_TYPES.DAILY_MARK
        ? context.prisma.journalEntry
        : context.prisma.quarterMark;

    await model.delete({
      where: {
        id: args.id,
      },
    });

    if (args.type === MARK_TYPES.DAILY_MARK) {
      await context.prisma.replacement.delete({
        where: {
          entryId: args.id,
        },
      });
    }
  },
  fetchJournal: async (parent, args, context) => {
    const dateGte = args.date_gte || `${args.year}-09-01T00:00:00.000Z`;
    const dateLte = args.date_lte || `${args.year + 1}-05-31T00:00:00.000Z`;

    const rawData = await context.prisma.teacher_Course_Student.findMany({
      where: {
        teacherId: args.teacherId,
        courseId: args.courseId,
      },
      select: {
        id: true,
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
        quarterMark: {
          where: {
            year: args.year,
          },
        },
        student: true,
        subgroup: true,
        archived: true,
      },
    });

    if (args.type === QUERY_TYPES.GROUP) {
      return groupJournalBuilder(rawData);
    }

    return { dates: null, students: rawData };
    // also add sorting where needed
  },
};

const groupJournalBuilder = (data) => {
  const groupedData = buildGroups(
    data,
    (item) =>
      `${item.student.class} ${item.student.program} ${item.subgroup || "..."}`,
    (item) => ({
      id: item.id,
      student: item.student,
      journalEntry: item.journalEntry,
      quarterMark: item.quarterMark,
      archived: item.archived,
    }),
    "students"
  );

  const dates = buildDatesByGroup(groupedData);

  return [dates, groupedData];
};

module.exports(typeDef, resolvers);
