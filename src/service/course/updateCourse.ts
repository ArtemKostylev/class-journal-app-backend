import { db } from '~/db'
import type { UpdateCourseRequestDto } from '~/dto/course/updateCourse/request'

export async function updateCourse(request: UpdateCourseRequestDto): Promise<void> {
    const { id, name, group, excludeFromReport, onlyHours } = request
    await db.course.upsert({
        where: { id },
        update: { name, group, excludeFromReport, onlyHours },
        create: { name, group, excludeFromReport, onlyHours },
    })
}
