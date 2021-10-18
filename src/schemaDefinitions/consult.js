const typeDef = `
  type Consult {
    id: Int!
    date: Date!
    year: Int!
    hours: Float!
    relation: Teacher_Course_Student
  }

  type GroupConsult {
    teacher: Teacher!
    course: Course!
    id: Int!
    date: Date!
    year: Int!
    subgroup: Int!
    hours: Float!
    class: Int!
    program: String!
  }

  extend type Query {
    fetchConsults(
      teacherId: Int
      courseId: Int
      year: Int
    ): [Teacher_Course_Student]

    fetchGroupConsults(
      teacherId: Int
      courseId: Int
      year: Int
    ): [GroupConsultOutput]
  }

  extend type Mutation {
    updateConsults(data: [ConsultInput]): [Consult]
    deleteConsults(ids: [Int]): Boolean
    updateGroupConsults(
      data: [GroupConsultInput]
      teacher: Int
      course: Int
    ): [GroupConsult]
    deleteGroupConsults(ids: [Int]): Boolean
  }

  input ConsultInput {
    id: Int!
    date: String!
    hours: Float!
    year: Int!
    relationId: Int!
  }

  input GroupConsultDetailsInput {
    id: Int!
    date: String!
    year: Int!
    hours: Float!
  }

  input GroupConsultInput {
    consults: [GroupConsultDetailsInput]
    program: String
    subgroup: Int
    class: Int
  }

  type GroupConsultShort {
    id: Int
    date: Date
    hours: Float
  }

  type GroupConsultOutput {
    group: String
    consults: [GroupConsultShort]
  }
`;

const resolvers = {
  Mutation: {
    updateConsults: async (parent, args, context, info) => {
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
    },

    deleteConsults: async (parent, args, context, info) => {
      let ids = args.ids.map((id) => parseInt(id));

      let res = await context.prisma.consult.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
    },

    updateGroupConsults: async (parent, args, context, info) => {
      return (updatedEntries = args.data.map((group) => {
        group.consults.map(async (consult) => {
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
    },

    deleteGroupConsults: async (parent, args, context, info) => {
      let ids = args.ids.map((id) => parseInt(id));

      let res = await context.prisma.groupConsult.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
    },
  },
  Query: {
    fetchGroupConsults: async (parent, args, context) => {
      const { userId } = context;

      let availableGroups = await context.prisma.teacher_Course_Student.findMany(
        {
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
        }
      );

      availableGroups = availableGroups.map(
        (item) =>
          `${item.student.class} ${item.student.program} ${
            item.subgroup || "..."
          }`
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
    },
    fetchConsults: async (parent, args, context) => {
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
    },
  },
};

module.exports = { typeDef, resolvers };
