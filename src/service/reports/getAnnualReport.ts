import type { Course, QuaterMark, Specialization, Student } from '@prisma/client'
import { db } from '~/db'
import { getCurrentAcademicYear } from '~/utils/academicDate'
import { buildHtml } from './htmlBuilder'
const htmlDocx = require('html-docx-js')
const fs = require('fs')

type ReportSelection = {
    quaterMark: QuaterMark[]
    student:
        | (Student & {
              specialization: Specialization | null
          })
        | null
    course: Course
}

interface ReportMap {
    courses: {
        id: number
        name: string | null
    }[]
    studentMarks: Map<string, { courseId: number; marks: QuaterMark[] }[]>
}

export async function getAnnualReport() {
    const year = getCurrentAcademicYear()

    const reportData = await db.teacher_Course_Student.findMany({
        where: {
            archived: false,
            freezeVersionId: null,
            course: {
                excludeFromReport: false,
            },
        },
        select: {
            quaterMark: {
                where: {
                    year,
                },
            },
            student: {
                include: {
                    specialization: true,
                },
            },
            course: true,
        },
    })

    const mappedData = new Map<string, ReportSelection[]>()

    reportData.forEach((item) => {
        if (!item.student || !item.student.specialization) return

        const key = `${item.student.class}/${item.student.specialization.name}/${item.student.program === 'OP' ? 'OP' : 'PP'}`

        if (mappedData.has(key)) {
            mappedData.get(key)?.push(item)
        } else {
            mappedData.set(key, [item])
        }
    })

    const reportMap = new Map<string, ReportMap>()

    mappedData.forEach((value, key) => {
        const coursesMap = new Map<number, string | null>()

        value.forEach((it) => coursesMap.set(it.course.id, it.course.name))

        const courses = Array.from(coursesMap, ([name, value]) => ({
            id: name,
            name: value,
        }))

        const studentMarks = new Map()

        value.forEach((it) => {
            if (!it.student) return
            const key = `${it.student.name} ${it.student.surname}`
            studentMarks.set(
                key,
                studentMarks.get(key)
                    ? [...studentMarks.get(key), { courseId: it.course.id, marks: it.quaterMark }]
                    : [{ courseId: it.course.id, marks: it.quaterMark }]
            )
        })

        reportMap.set(key, { courses, studentMarks })
    })

    const doc = buildHtml(mappedData)

    const docx = htmlDocx.asBlob(doc, { orientation: 'landscape' })

    fs.writeFile(`/var/www/akostylev/files/vedomost_${year}.docx`, docx, function (err: any) {
        if (err) throw err
    })

    return `https://akostylev.com/files/vedomost_${year}.docx`
}
