fetchFullInfo: FullInfo!

fetchAnnualReport(year: Int): String
updateCourseRelations(teacher: Int, courses: [CourseRelationInput]): [Boolean]
updateStudentRelations(
  teacher: Int
  course: Int
  students: [StudentRelationInput]
): [Boolean]

input CourseRelationInput {
  id: Int
  archived: Boolean
}

input StudentRelationInput {
  id: Int
  archived: Boolean
}

type FullInfo {
  teachers: [Teacher]
  students: [Student]
  courses: [Course]
  relations: [Teacher_Course_Student]
}