const gql = require("graphql-tag");

const typeDef = gql`
  type Group {
    class: Int
    program: String
    relations: [Teacher_Course_Student]
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
  return (updatedEntries = args.data.map((subgroup) => {
    return context.prisma.teacher_Course_Student.update({
      where: {
        id: subgroup.id,
      },
      data: {
        subgroup: subgroup.subgroup,
      },
    });
  }));
};

const fetchSubgroups = async (parent, args, context) => {
  const { userId } = context;
  let students = await context.prisma.teacher_Course_Student.findMany({
    where: {
      teacherId: args.teacherId,
      courseId: args.courseId,
    },
    include: {
      student: true,
    },
  });

  let groups = [];
  let classes = [];
  let programs = [];
  let subgroups = [];
  let groupedData = [];

  students.forEach((item) => {
    classes.push(item.student.class);
    programs.push(item.student.program);
  });

  classes = [...new Set(classes)];
  programs = [...new Set(programs)];

  classes.forEach((num) => {
    programs.forEach((program) => {
      groups.push({
        class: num,
        program: program,
        relations: [],
      });
    });
  });

  students.forEach((item) => {
    let index = groups.findIndex(
      (group) =>
        item.student.class === group.class &&
        item.student.program === group.program
    );
    groups[index].relations.push(item);
  });

  groups.forEach((group) => {
    if (group.relations.length > 0) groupedData.push(group);
  });

  return groupedData;
};

module.exports(typeDef);
