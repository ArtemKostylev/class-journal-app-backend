import { db } from '~/db'
import type { StudentListItem } from '~/dto/student/getStudentList/response'
import type { OffsetResponse } from '~/dto/shared/offsetResponse'
import type { GetStudentListRequestDto } from '~/dto/student/getStudentList/request'
import type { Program, Prisma } from '@prisma/client'

export async function getStudentList(params: GetStudentListRequestDto): Promise<OffsetResponse<StudentListItem>> {
    const { offset, limit, filters } = params

    const where: Prisma.StudentWhereInput = {
        deleted: false,
        freezeVersionId: null,
    }

    if (filters?.name) {
        where.name = filters.name
    }
    if (filters?.surname) {
        where.surname = filters.surname
    }
    if (filters?.class) {
        where.class = Number(filters.class)
    }
    if (filters?.program) {
        where.program = filters.program as Program
    }
    if (filters?.specialization) {
        where.specializationId = Number(filters.specialization)
    }

    const students = await db.student.findMany({
        where,
        select: {
            id: true,
            name: true,
            surname: true,
            specialization: true,
            class: true,
            program: true,
        },
        orderBy: [
            {
                class: 'asc',
            },
            {
                program: 'asc',
            },
            {
                specializationId: 'asc',
            },
            {
                id: 'asc',
            },
        ],
        skip: offset,
        take: limit,
    })

    const rows = students.map((student) => ({
        id: student.id,
        name: student.name,
        surname: student.surname,
        specialization: {
            text: student.specialization?.name ?? '',
            value: String(student.specialization?.id),
        },
        class: student.class,
        program: student.program,
    }))

    return {
        rows,
        nextOffset: students.length === limit ? offset + limit : undefined,
    }
}
