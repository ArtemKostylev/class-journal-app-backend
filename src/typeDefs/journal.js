fetchJournal(
  teacherId: Int!
  courseId: Int!
  year: Int!
  date_gte: Date
  date_lte: Date
): [Teacher_Course_Student]

updateJournal(data: JournalUpdateInput): Boolean

fetchQuaterMarks(teacherId: Int, courseId: Int): [Teacher_Course_Student]

type Teacher_Course_Student {
  id: Int!
  teacher: Teacher!
  course: Course!
  student: Student
  subgroup: Int
  journalEntry: [JournalEntry]
  quaterMark: [QuaterMark]
  consult: [Consult]
  archived: Boolean
  hours: Int
}

type JournalEntry {
  id: Int!
  mark: String!
  date: Date!
  relation: Teacher_Course_Student
  replacement: Replacement
}

type QuaterMark {
  id: Int!
  mark: String!
  period: String!
  relation: Teacher_Course_Student
  year: Int
}

input JournalEntryInput {
  id: Int
  mark: String!
  date: Date!
  relationId: Int!
}

input Teacher_Course_StudentInput {
  id: Int
  teacherId: Int
  courseId: Int
  studentId: Int
}
input QuaterMarkInput {
id: Int
mark: String!
period: String!
relationId: Int!
year: Int
}

input JournalUpdateInput {
updateCasual: [JournalEntryInput]
updatePeriod: [QuaterMarkInput]
deleteCasual: [Int]
deletePeriod: [Int]
}