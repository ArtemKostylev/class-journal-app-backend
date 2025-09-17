import { db } from '~/db'
import type { GetTeacherListResponseDto } from '~/dto/teacher/getTeacherList/response'

export async function getTeacherList(): Promise<GetTeacherListResponseDto[]> {
    const teachers = await db.teacher.findMany({
        where: {
            freezeVersionId: null,
            deleted: false,
        },
        select: {
            id: true,
            name: true,
            surname: true,
            parent: true,
            relations: {
                distinct: ['courseId'],
                select: {
                    course: {
                        select: {
                            id: true,
                        },
                    },
                },
            },
        },
    })

    return teachers.map((teacher) => {
        return {
            id: teacher.id,
            name: teacher.name,
            surname: teacher.surname,
            parent: teacher.parent,
            courses: teacher.relations.map((relation) => relation.course.id),
        }
    })
}
