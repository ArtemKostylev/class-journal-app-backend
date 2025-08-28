export interface MarkDto {
    id: number | undefined
    mark: string
    date: string
}

export interface QuarterMarkDto {
    id: number | undefined
    period: string
    year: number
    mark: string
}

export interface GroupJournalDto {
    relationId: number
    studentName: string
    archived: boolean
    marks: Record<string, MarkDto>
    quarterMarks: Record<string, QuarterMarkDto>
}
