fetchReplacements(
  teacherId: Int
  courseId: Int
  date_gte: Date!
  date_lte: Date!
): [Teacher_Course_Student]

updateReplacements(data: [ReplacementInput]): [Replacement]
deleteReplacements(ids: [Int]): Boolean
  

type Replacement {
  id: Int!
  date: Date!
  journalEntry: JournalEntry
}

input ReplacementInput {
  id: Int
  date: Date
  entryId: Int!
}