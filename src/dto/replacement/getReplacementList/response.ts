export interface ReplacementDto {
    id: number | undefined
    date: string | undefined
    journalEntryId: number
    journalEntryDate: string
}

export interface ReplacementRow {
    relationId: number
    archived: boolean
    studentName: string
    studentClass: string
    replacements: Record<number, ReplacementDto>
}

export interface ReplacementListResponseDto {
    rows: ReplacementRow[]
}
