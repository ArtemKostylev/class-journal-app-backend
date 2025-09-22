import { db } from '~/db'
import type { GetCourseListResponseDto } from '~/dto/course/getCourseList/response'
import type { OffsetRequestDto } from '~/dto/shared/offsetRequest'
import type { OffsetResponse } from '~/dto/shared/offsetResponse'

export async function getCourseList(params: OffsetRequestDto): Promise<OffsetResponse<GetCourseListResponseDto>> {
    const { offset, limit } = params

    const courses = await db.course.findMany({
        where: {
            freezeVersionId: null,
            deleted: false,
        },
        orderBy: {
            id: 'asc',
        },
        skip: offset,
        take: limit,
    })

    const rows = courses.map((course) => ({
        id: course.id,
        name: course.name ?? '',
        group: course.group,
        excludeFromReport: course.excludeFromReport,
        onlyHours: course.onlyHours,
        onlyGroups: course.onlyGroups,
    }))

    return {
        rows,
        nextOffset: courses.length === limit ? offset + limit : undefined,
    }
}
