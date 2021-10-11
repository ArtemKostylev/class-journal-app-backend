const typeDef = `
  type Replacement {
    id: Int!
    date: Date!
    journalEntry: JournalEntry
  }

  extend type Query {
    fetchReplacements(
      teacherId: Int
      courseId: Int
      date_gte: Date!
      date_lte: Date!
    ): [Teacher_Course_Student]
  }

  extend type Mutation {
    updateReplacements(data: [ReplacementInput]): [Replacement]
    deleteReplacements(ids: [Int]): Boolean
  }

  input ReplacementInput {
    id: Int
    date: Date
    entryId: Int!
  }
`;

const resolvers = {
  Mutation: {
    updateReplacements: async (parent, args, context, info) => {
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
    },
    deleteReplacements: async (parent, args, context, info) => {
      let ids = args.ids.map((id) => parseInt(id));

      let res = await context.prisma.replacement.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
    },
  },
  Query: {
    fetchReplacements: async (parent, args, context) => {
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
    },
  },
};

module.exports = { typeDef, resolvers };
