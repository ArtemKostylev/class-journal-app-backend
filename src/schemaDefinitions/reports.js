const docx = require("docx");

const typeDef = `
  type Specialization {
    id Int
    name String
  }
`;

const fetchAnnualReport = async (parent, args, context) => {
  const FILE_LOCATION = "";

  const data = await context.prisma.teacher_Course_Student.findMany({
    where: {
      archived: false,
    },
    select: {
      quarterMark: {
        where: {
          year: args.year,
        },
      },
      student: {
        include: {
          specialization: true,
        },
      },
      course: {
        id: true,
        name: true,
      },
    },
  });

  //TODO sort the data first
  console.log("data unsorted", data);

  // here we have quarter data for each relation
  /*  we need to get it to target shape, i.e.
      top level is specialization, 
      inside specialization we have a table there quarter marks are 
      displayed by course. Inside course we display items by quarter and year

      specialization is stored inside student itself
      SO, 1st step is to split all found items by student.specialization
      2nd step: we create new objects with shape: {
        student,
        courses: [
          {
            quarterMark
          }
        ]
      }
      ALSO, we need to create headers array from specialization object
  */
  const dataBySpecialization = new Map();
  data.forEach((relation) => {
    const key = relation.student.specialization.name;
    const value = {
      course: relation.course,
      student: relation.student,
      marks: relation.quarterMark
    };
  });

  //const doc = new docx.Document({});
  return FILE_LOCATION;
};

module.exports = {
  fetchAnnualReport,
};
