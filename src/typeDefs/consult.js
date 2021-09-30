fetchConsults(
  teacherId: Int
  courseId: Int
  year: Int
): [Teacher_Course_Student]

fetchGroupConsults(
  teacherId: Int
  courseId: Int
  year: Int
): [GroupConsultOutput]

updateConsults(data: [ConsultInput]): [Consult]
  deleteConsults(ids: [Int]): Boolean
  updateGroupConsults(
    data: [GroupConsultInput]
    teacher: Int
    course: Int
  ): [GroupConsult]
deleteGroupConsults(ids: [Int]): Boolean
  
type Consult {
  id: Int!
  date: Date!
  year: Int!
  hours: Float!
  relation: Teacher_Course_Student
}

type GroupConsult {
  teacher: Teacher!
  course: Course!
  id: Int!
  date: Date!
  year: Int!
  subgroup: Int!
  hours: Float!
  class: Int!
  program: String!
}

input ConsultInput {
  id: Int!
  date: String!
  hours: Float!
  year: Int!
  relationId: Int!
}

input GroupConsultDetailsInput {
  id: Int!
  date: String!
  year: Int!
  hours: Float!
}

input GroupConsultInput {
  consults: [GroupConsultDetailsInput]
  program: String
  subgroup: Int
  class: Int
}

type GroupConsultShort {
  id: Int
  date: Date
  hours: Float
}

type GroupConsultOutput {
  group: String
  consults: [GroupConsultShort]
}