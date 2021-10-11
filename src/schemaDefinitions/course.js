const typeDef = `
  type Course {
    id: Int!
    name: String!
    relations: [Teacher_Course_Student]
    group: Boolean
    excludeFromReport: Boolean
    onlyGroups: Boolean
    onlyHours: Boolean
    parentId: Int
  }

  extend type Query {
    fetchCourses: [Course!]!
  }

  extend type Mutation {
    updateCourse(data: CourseInput): Course
    deleteCourse(id: Int): Boolean
    createCourse(data: CourseInput): Course
  }

  input CourseInput {
    id: Int
    name: String
    group: Boolean
    excludeFromReport: Boolean
    onlyGroups: Boolean
    onlyHours: Boolean
    parentId: Int
  }
`;

const resolvers = {
  Mutation: {

  updateCourse: async (parent, args, context, info) => {
    return await context.prisma.course.update({
      where: {
        id: args.data.id,
      },
      data: {
        name: args.data.name,
        group: args.data.group,
        excludeFromReport: args.data.excludeFromReport,
        onlyHours: args.data.onlyHours,
        onlyGroups: args.data.onlyGroups,
        parentId: args.data.parentId,
      },
    });
  },
  deleteCourse: async (parent, args, context, info) => {
    await context.prisma.course.delete({
      where: {
        id: args.id,
      },
    });
  },
  createCourse: async (parent, args, context, info) => {
    await context.prisma.course.create({
      data: {
        name: args.data.name,
        group: args.data.group,
        excludeFromReport: args.data.excludeFromReport,
        onlyHours: args.data.onlyHours,
        onlyGroups: args.data.onlyGroups,
        parentId: args.data.parentId,
      },
    });
  },
  },
  Query: {

  fetchCourses: async (parent, args, context) => {
    const { userId } = context;
    return await context.prisma.course.findMany();
  },
  }
};

module.exports = { typeDef, resolvers }
