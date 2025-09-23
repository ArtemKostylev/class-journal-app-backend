export interface RelationStudent {
    id: number
    archived: boolean
}

export interface RelationCourse {
    courseId: number
    students: RelationStudent[]
    archived: boolean
}

export interface GetRelationsDataResponseDto {
    teacherId: number
    coursesById: Record<number, RelationCourse>
    courses: { id: number; archived: boolean }[]
}
