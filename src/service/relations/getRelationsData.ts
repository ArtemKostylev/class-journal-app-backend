import { db } from '~/db'
import type { GetRelationsDataResponseDto } from '~/dto/relations/getRelationsData/response'

function createTeacherRecord(teacherId: number): GetRelationsDataResponseDto {
    return {
        teacherId,
        coursesById: {},
        courses: [],
    }
}

function createCourseRecord(courseId: number): GetRelationsDataResponseDto['coursesById'][number] {
    return {
        courseId,
        students: [],
        archived: true,
    }
}

export async function getRelationsData(): Promise<Record<string, GetRelationsDataResponseDto>> {
    const relations = await db.teacher_Course_Student.findMany({
        where: {
            freezeVersionId: null,
        },
        orderBy: {
            id: 'asc',
        },
        select: {
            teacherId: true,
            studentId: true,
            courseId: true,
            archived: true,
        },
    })

    return relations.reduce((acc, relation) => {
        const teacherRecord = acc[relation.teacherId] || createTeacherRecord(relation.teacherId)

        if (!teacherRecord.courses.some((course) => course.id === relation.courseId)) {
            teacherRecord.courses.push({
                id: relation.courseId,
                archived: relation.archived,
            })
        }

        const courseRecord = teacherRecord.coursesById[relation.courseId] || createCourseRecord(relation.courseId)

        courseRecord.archived = courseRecord.archived && relation.archived
        if (relation.studentId) {
            courseRecord.students.push({
                id: relation.studentId,
                archived: relation.archived,
            })
        }

        teacherRecord.coursesById[relation.courseId] = courseRecord
        acc[relation.teacherId] = teacherRecord

        return acc
    }, {} as Record<string, GetRelationsDataResponseDto>)
}
