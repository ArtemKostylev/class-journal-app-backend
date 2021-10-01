const gql = require("graphql-tag");

const typeDef = gql`
  type Teacher {
    id: Int!
    name: String
    surname: String
    parent: String
    userId: Int
    relations: [Teacher_Course_Student]
  }

  extend type Query {
    fetchTeachers: [Teacher!]!
  }

  extend type Mutation {
    updateTeacher(data: TeacherInput): Teacher
    deleteTeacher(id: Int): Boolean
    createTeacher(data: TeacherInput): Teacher
  }

  input TeacherInput {
    id: Int
    name: String
    surname: String
    parent: String
  }
`;

const updateTeacher = async (_, args, context, info) => {
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

const deleteTeacher = async (_, args, context, info) => {
  await context.prisma.teacher.delete({
    where: {
      id: args.id,
    },
  });
};

const createTeacher = async (_, args, context, info) => {
  await context.prisma.teacher.create({
    data: {
      name: args.data.name,
      surname: args.data.surname,
      parent: args.parent,
    },
  });
};

const fetchTeachers = async (_, args, context) => {
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

module.exports(typeDef);
