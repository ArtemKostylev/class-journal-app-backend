export interface ConsultDto {
    id: number
    date: string
    hours: number
}

export interface ConsultListResponseDto {
    relationId: number
    archived: boolean
    studentName: string
    consults: ConsultDto[]
}
