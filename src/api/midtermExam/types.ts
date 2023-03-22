export type MidtermExamInput = {
  id?: number;
  date?: string;
  teacherId: number;
  studentId: number;
  typeId: number;
  contents?: string;
  result?: string;
}

export type MidtermExamTypeInput = {
  id?: number;
  name: string;
}