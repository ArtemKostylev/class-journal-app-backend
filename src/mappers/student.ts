import type { Student } from '@prisma/client'
import { PROGRAMS } from '~/const/programs'

type StudentSelected = Pick<Student, 'name' | 'surname' | 'class' | 'program'>

export function convertStudentName(student: StudentSelected | null): string {
    if (!student) {
        return ''
    }

    return `${student.surname} ${student.name}`
}

export function convertStudentClass(student: StudentSelected | null): string {
    if (!student) {
        return ''
    }

    return `${student?.class} ${student?.program ? PROGRAMS[student?.program] : ''}`
}
