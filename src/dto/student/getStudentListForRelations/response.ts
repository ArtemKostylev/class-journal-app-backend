export interface GetStudentListForRelationsResponseDto {
    group: string
    students: StudentListForRelationsItem[]
}

export interface StudentListForRelationsItem {
    id: number
    name: string
}
