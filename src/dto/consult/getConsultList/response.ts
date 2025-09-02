import type { Student, Consult } from '@prisma/client'

export interface ConsultListResponseDto {
    id: number
    student: Student | null
    consults: Consult[] | null
}
