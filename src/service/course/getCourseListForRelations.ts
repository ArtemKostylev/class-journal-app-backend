import type { CourseForRelationsItem, GetCourseForRelationsResponseDto } from '~/dto/course/getCourseListForRelations/response'
import { db } from '~/db'

export async function getCourseListForRelations(): Promise<GetCourseForRelationsResponseDto> {
    const courses = await db.course.findMany({
        select: {
            id: true,
            name: true,
        },
        where: {
            deleted: false,
            freezeVersionId: null,
        },
        orderBy: {
            id: 'asc',
        },
    })

    const data = courses.reduce((acc, course) => {
        acc[course.id] = {
            id: course.id,
            courseName: course.name ?? '',
        }
        return acc
    }, {} as Record<number, CourseForRelationsItem>)

    return {
        ids: courses.map((course) => course.id),
        data,
    }
}
