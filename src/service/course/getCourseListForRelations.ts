import type { GetCourseListForRelationsResponseDto } from '~/dto/course/getCourseListForRelations/response'
import { db } from '~/db'

export async function getCourseListForRelations(): Promise<GetCourseListForRelationsResponseDto[]> {
    const courses = await db.course.findMany({
        select: {
            id: true,
            name: true,
        },
        where: {
            deleted: false,
            freezeVersionId: null,
        },
    })

    return courses.map((course) => ({
        id: course.id,
        courseName: course.name ?? '',
    }))
}
