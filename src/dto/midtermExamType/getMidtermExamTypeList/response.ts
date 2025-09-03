export interface MidtermExamTypeDto {
    id: number
    name: string
}

export interface GetMidtermExamTypeListResponseDto {
    midtermExamTypes: MidtermExamTypeDto[]
    midtermExamTypesById: Record<number, MidtermExamTypeDto>
}
