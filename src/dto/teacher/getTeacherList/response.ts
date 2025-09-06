export interface GetTeacherListResponseDto {
    id: number
    name: string | null
    surname: string | null
    parent: string | null
    courses: number[]
}
