const gql = require("graphql-tag");

const typeDef = gql`
  type CourseHours {
    id: Int
    course: Course
    teacher: Teacher
    class: Int
    program: String
    subgroup: Int
    date: Date
    hours: Float
  }

  extend type Query {
    fetchGroupCompany(teacherId: Int, courseId: Int): [CourseHoursOutput]
  }

  extend type Mutation {
    updateGroupCompany(data: [CourseHoursInput]): Boolean
    deleteGroupCompany(ids: [Int]): Boolean
  }

  input CourseHoursInput {
    id: Int
    courseId: Int
    teacherId: Int
    class: Int
    program: String
    subgroup: Int
    date: Date
    hours: Float
  }

  type CourseHoursShort {
    id: Int
    date: Date
    hours: Float
  }

  type CourseHoursOutput {
    group: String
    hours: CourseHoursShort
  }
`;

const resolvers = {
  updateGroupCompany: async (parent, args, context, info) => {
    await args.data.map(async (item) => {
      await context.prisma.courseHours.upsert({
        where: {
          id: item.id,
        },
        update: {
          date: item.date,
          hours: item.hours,
        },
        create: {
          courseId: item.courseId,
          teacherId: item.teacherId,
          class: item.class,
          program: item.program,
          subgroup: item.subgroup,
          date: item.date,
          hours: item.hours,
        },
      });
    });
  },
  deleteGroupCompany: async (parent, args, context, info) => {
    let ids = args.ids.map((id) => parseInt(id));
  
    let res = await context.prisma.courseHours.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  },
  fetchGroupCompany: async (parent, args, context) => {
    // args: teacherId, courseId
    // 1. Get corresponding course from DB
    const course = await context.prisma.course.findUnique({
      where: {
        id: args.courseId,
      },
      select: {
        parentId: true,
      },
    });
    // 2. Get all relations of corresponding course
    const relations = await context.prisma.teacher_Course_Student.findMany({
      where: {
        courseId: course.parentId,
      },
      select: {
        student: {
          select: {
            class: true,
            program: true,
          },
        },
        subgroup: true,
      },
    });
    // 3. Create groups from corr relations
    const groups = new Set(
      relations.map((item) => {
        return `${item.student.class} ${item.student.program} ${
          item.subgroup | "..."
        }`;
      })
    );
    // 4. Get all Hour data based on created groups
    const hours = await context.prisma.courseHours.findMany({
      where: {
        courseId: args.courseId,
        teacherId: args.teacherId,
      },
      select: {
        class: true,
        program: true,
        subgroup: true,
        date: true,
        hours: true,
      },
    });
    // 5. return Hour data
    const result = new Map();
    hours.forEach((item) => {
      const key = `${item.class} ${item.program} ${item.subgroup | "..."}`;
      const value = {
        id: item.id,
        date: item.date,
        hours: item.hours,
      };
      if (result.has(key)) {
        result.set(key, result.get(key).push(value));
      } else {
        result.set(key, [value]);
      }
    });
  
    return groups.map((group) => {
      if (result.has(group)) return { group: group, hours: result.get(group) };
      return { group: group, hours: [] };
    });
  },
}



module.exports(typeDef, resolvers);
