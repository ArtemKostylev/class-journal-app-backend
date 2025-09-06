import type { Program } from '@prisma/client'

export interface GetGroupConsultListResponseDto {
    group: string
    class: number
    program: Program
    subgroup?: number | undefined
    consults: {
        id: number
        date: string
        hours: number
    }[]
}
