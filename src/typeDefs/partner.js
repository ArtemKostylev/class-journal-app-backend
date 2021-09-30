fetchGroupCompany(teacherId: Int, courseId: Int): [CourseHoursOutput]


updateGroupCompany(data: [CourseHoursInput]): Boolean
deleteGroupCompany(ids: [Int]): Boolean

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
