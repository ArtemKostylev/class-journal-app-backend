const typeDef = `
  type Student {
    id: Int!
    name: String
    surname: String
    class: Int
    program: String
    load: Int
    relations: [Teacher_Course_Student]
  }

  extend type Query {
    fetchStudents: [Student!]!
  }

  extend type Mutation {
    updateStudent(data: StudentInput): Student
    deleteStudent(id: Int): Boolean
    createStudent(data: StudentInput): Student
  }

  input StudentInput {
    id: Int
    name: String
    surname: String
    class: Int
    program: String
  }
`;

const resolvers = {
  Mutation: {
    updateStudent: async (parent, args, context, info) => {
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
    },
    deleteStudent: async (parent, args, context, info) => {
      await context.prisma.student.delete({
        where: {
          id: args.id,
        },
      });
    },
    createStudent: async (parent, args, context, info) => {
      await context.prisma.student.create({
        data: {
          name: args.data.name,
          surname: args.data.surname,
          class: parseInt(args.data.class),
          program: args.data.program,
        },
      });
    },
  },
  Query: {
    fetchStudents: async (parent, args, context) => {
      const { userId } = context;
      return await context.prisma.student.findMany();
    },
  },
};

module.exports = { typeDef, resolvers };
