const gql = require("graphql-tag");

const typeDef = gql`
  type Note {
    id: Int!
    text: String!
    year: Int!
    teacher: Teacher
    course: Course
  }

  extend type Query {
    fetchNotes(teacherId: Int, courseId: Int, year: Int): Note
  }

  extend type Mutation {
    updateNote(data: NoteInput): Note
    deleteNote(id: Int): Boolean
  }

  input NoteInput {
    id: Int!
    text: String
    year: Int
    teacherId: Int
    courseId: Int
  }
`;

const resolvers = {
  updateNote: async (parent, args, context, info) => {
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
  },
  deleteNote: async (parent, args, context, info) => {
    await context.prisma.course.delete({
      where: {
        id: args.id,
      },
    });
  },
  fetchNotes: async (parent, args, context) => {
    const { userId } = context;
    return await context.prisma.note.findFirst({
      where: {
        courseId: args.courseId,
        teacherId: args.teacherId,
        year: args.year,
      },
    });
  },
};

module.exports(typeDef, resolvers);
