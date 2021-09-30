fetchStudents: [Student!]!

  
updateStudent(data: StudentInput): Student
deleteStudent(id: Int): Boolean

createStudent(data: StudentInput): Student

input StudentInput {
  id: Int
  name: String
  surname: String
  class: Int
  program: String
}

type Student {
  id: Int!
  name: String
  surname: String
  class: Int
  program: String
  load: Int
  relations: [Teacher_Course_Student]
  subgroup: [Subgroup]
}