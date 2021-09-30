type Group {
  class: Int
  program: String
  relations: [Teacher_Course_Student]
}



input SubgroupInput {
  id: Int!
  subgroup: Int
}

updateSubgroups(data: [SubgroupInput]): [Teacher_Course_Student]

fetchSubgroups(courseId: Int, teacherId: Int): [Group]