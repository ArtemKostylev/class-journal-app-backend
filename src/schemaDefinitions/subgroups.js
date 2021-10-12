const { buildGroups } = require("../utils");

const typeDef = `
  type SubgroupOutput {
    group: String!
    relations: [Group!]!
  }

  type Group {
    id: Int
    subgroup: Int
    student: Student
  }

  extend type Query {
    fetchSubgroups(courseId: Int, teacherId: Int): [SubgroupOutput]
  }

  extend type Mutation {
    updateSubgroups(data: [SubgroupInput]): [Teacher_Course_Student]
  }

  input SubgroupInput {
    id: Int!
    subgroup: Int
  }
`;

const resolvers = {
  Mutation: {
    updateSubgroups: async (parent, args, context, info) => {
      Promise.all(
        args.data.map((subgroup) =>
          context.prisma.teacher_Course_Student.update({
            where: {
              id: subgroup.id,
            },
            data: {
              subgroup: subgroup.subgroup,
            },
          })
        )
      );
    },
  },
  Query: {
    fetchSubgroups: async (parent, args, context) => {
      let students = await context.prisma.teacher_Course_Student.findMany({
        where: {
          teacherId: args.teacherId,
          courseId: args.courseId,
        },
        select: {
          id: true,
          student: true,
          subgroup: true,
        },
      });

      return buildGroups(
        students,
        (item) => `${item.student.class} ${item.student.program}`,
        (item) => ({
          relation: item.id,
          name: item.student.name,
          surname: item.student.surname,
          subgroup: item.subgroup,
        }),
        "relations"
      );
    },
  },
};

module.exports = { typeDef, resolvers };
