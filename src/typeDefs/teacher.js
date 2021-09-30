fetchTeachers: [Teacher!]!

updateTeacher(data: TeacherInput): Teacher
deleteTeacher(id: Int): Boolean

createTeacher(data: TeacherInput): Teacher
  
type Teacher {
  id: Int!
  name: String
  surname: String
  parent: String
  userId: Int
  relations: [Teacher_Course_Student]
}

input TeacherInput {
  id: Int
  name: String
  surname: String
  parent: String
}