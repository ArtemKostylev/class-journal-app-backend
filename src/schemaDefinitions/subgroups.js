const gql = require("graphql-tag");
const { buildGroups } = require("../utils");

const typeDef = gql`
  type SubgroupOutput {
    group: String!
    relations: [Group!]!
  }

  type Group {
    relation: Int
    name: String
    surname: String
    subgroup: Int
  }

  extend type Query {
    fetchSubgroups(courseId: Int, teacherId: Int): [Group]
  }

  extend type Mutation {
    updateSubgroups(data: [SubgroupInput]): [Teacher_Course_Student]
  }

  input SubgroupInput {
    id: Int!
    subgroup: Int
  }
`;

const updateSubgroups = async (parent, args, context, info) => {
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
};

const fetchSubgroups = async (parent, args, context) => {
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
};

module.exports(typeDef);
