import { db } from '~/db'
import type { GetCourseListResponseDto } from '~/dto/course/getCourseList/response'

export async function getCourseList(): Promise<GetCourseListResponseDto[]> {
    const courses = await db.course.findMany({
        where: {
            freezeVersionId: null,
            deleted: false,
        },
    })
    return courses.map((course) => ({
        id: course.id,
        name: course.name ?? '',
        group: course.group,
        excludeFromReport: course.excludeFromReport,
        onlyHours: course.onlyHours,
        onlyGroups: course.onlyGroups,
    }))
}
