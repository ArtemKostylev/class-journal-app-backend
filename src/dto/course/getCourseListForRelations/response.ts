export interface CourseForRelationsItem {
    id: number
    courseName: string
}

export interface GetCourseForRelationsResponseDto {
    ids: number[]
    data: Record<number, CourseForRelationsItem>
}
