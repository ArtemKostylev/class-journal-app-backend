fetchCourses: [Course!]!


updateCourse(data: CourseInput): Course
deleteCourse(id: Int): Boolean
createCourse(data: CourseInput): Course

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

input CourseInput {
  id: Int
  name: String
  group: Boolean
  excludeFromReport: Boolean
  onlyGroups: Boolean
  onlyHours: Boolean
  parentId: Int
}


