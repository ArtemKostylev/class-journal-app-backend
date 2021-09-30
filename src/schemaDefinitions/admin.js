const gql = require("graphql-tag");

const typeDef = gql`
  type FullInfo {
    teachers: [Teacher]
    students: [Student]
    courses: [Course]
    relations: [Teacher_Course_Student]
  }

  extend type Query {
    fetchFullInfo: FullInfo!
    fetchAnnualReport(year: Int): String
  }

  extend type Mutation {
    updateCourseRelations(
      teacher: Int
      courses: [CourseRelationInput]
    ): [Boolean]
    updateStudentRelations(
      teacher: Int
      course: Int
      students: [StudentRelationInput]
    ): [Boolean]
  }

  input CourseRelationInput {
    id: Int
    archived: Boolean
  }

  input StudentRelationInput {
    id: Int
    archived: Boolean
  }
`;

const updateCourseRelations = async (parent, args, context, info) => {
  //teacherID, [{courseId, archived}]

  console.log("input", args.courses);

  const archived = args.courses.filter((el) => el.archived);

  const pendingEntries = await context.prisma.teacher_Course_Student.findMany({
    where: {
      teacherId: args.teacher,
      courseId: { in: args.courses.map((item) => item.id) },
    },
  });
  console.log("pending", pendingEntries);

  const newCourses = args.courses.filter(
    (el) => 0 > pendingEntries.findIndex((entry) => el.id !== entry.CourseId)
  );

  console.log("new", newCourses);

  const createdEntries = newCourses.map(
    async (item) =>
      await context.prisma.teacher_Course_Student.create({
        data: {
          teacherId: args.teacher,
          courseId: item.id,
        },
      })
  );

  console.log("archived", archived);

  const updatedEntries = pendingEntries.map(async (entry) => {
    return await context.prisma.teacher_Course_Student.update({
      where: {
        id: entry.id,
      },
      data: {
        archived: !!archived.find((el) => el.id === entry.courseId),
      },
    });
  });
};

const updateStudentRelations = async (parent, args, context, info) => {
  console.log("input", args.students);

  const archived = args.students.filter((el) => el.archived);

  console.log("archived", archived);

  const newEmptyRelation = await context.prisma.teacher_Course_Student.findMany(
    {
      where: {
        teacherId: args.teacher,
        courseId: args.course,
        studentId: null,
      },
    }
  );

  console.log("empty", newEmptyRelation);

  const pendingEntries = await context.prisma.teacher_Course_Student.findMany({
    where: {
      teacherId: args.teacher,
      courseId: args.course,
      studentId: { in: args.students.map((item) => item.id) },
    },
  });

  console.log("pending", pendingEntries);

  const newStudents = args.students.filter(
    (el) =>
      -1 === pendingEntries.findIndex((entry) => el.id === entry.studentId)
  );

  console.log("new", newStudents);

  if (newEmptyRelation.length !== 0) {
    //we should add first n new students to empty relations. Actually, there should be no more than one empty relation.
    //so, we only update the studentId value of a relation, and discard this student from new students.
    await context.prisma.teacher_Course_Student.update({
      where: {
        id: newEmptyRelation[0].id,
      },
      data: {
        studentId: newStudents[0].id,
        archived: false,
      },
    });
    newStudents.splice(0, 1);
  }

  console.log("new after fill", newStudents);

  const createdEntries = newStudents.map(
    async (item) =>
      await context.prisma.teacher_Course_Student.create({
        data: {
          teacherId: args.teacher,
          courseId: args.course,
          studentId: item.id,
        },
      })
  );

  const updatedEntries = pendingEntries.map(async (entry) => {
    return await context.prisma.teacher_Course_Student.update({
      where: {
        id: entry.id,
      },
      data: {
        archived: !!archived.find((el) => el.id === entry.studentId),
      },
    });
  });
};

const fetchFullInfo = async (parent, args, context) => {
  const { userId } = context;
  const teachers = await context.prisma.teacher.findMany();
  const students = await context.prisma.student.findMany();
  const courses = await context.prisma.course.findMany();
  const relations = await context.prisma.teacher_Course_Student.findMany({
    include: {
      teacher: true,
      student: true,
      course: true,
    },
  });
  return {
    teachers,
    students,
    courses,
    relations,
  };
};

const fetchAnnualReport = async (parent, args, context) => {
  const FILE_LOCATION = "";
  const dateGte = `${args.year}-09-01T00:00:00.000Z`;
  const dateLte = `${args.year + 1}-05-31T00:00:00.000Z`;

  const data = await context.prisma.teacher_Course_Student.findMany({
    where: {
      archived: false,
    },
    select: {
      quaterMark: {
        where: {
          year: args.year,
        },
      },
      quaterMark: true,
      student: {
        inlude: {
          specialization: true,
        },
      },
      course: true,
    },
  });

  //TODO sort the data first
  console.log("data unsorted", data);

  //const doc = new docx.Document({});
  return FILE_LOCATION;
};

module.exports(typeDef);
