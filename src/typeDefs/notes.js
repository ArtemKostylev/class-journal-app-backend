fetchNotes(teacherId: Int, courseId: Int, year: Int): Note
updateNote(data: NoteInput): Note
deleteNote(id: Int): Boolean
  
type Note {
  id: Int!
  text: String!
  year: Int!
  teacher: Teacher
  course: Course
}

input NoteInput {
  id: Int!
  text: String
  year: Int
  teacherId: Int
  courseId: Int
}