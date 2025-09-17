import type { UserDataResponseDto, UserVersionDto, VersionCourseDto } from '~/dto/user/getUserData/response'
import { db } from '~/db'
import { getCurrentAcademicYear } from '~/utils/academicDate'
import type { Course, FreezeVersion, Teacher } from '@prisma/client'

export async function getUserData(userId: number, role?: number): Promise<UserDataResponseDto> {
    const teachers = await db.teacher.findMany({
        where: {
            userId,
        },
        select: {
            id: true,
            relations: {
                select: {
                    course: {
                        select: {
                            id: true,
                            name: true,
                            group: true,
                            onlyHours: true,
                        },
                    },
                },
                distinct: ['courseId'],
                where: {
                    archived: false,
                },
            },
            freezeVersion: {
                select: {
                    year: true,
                },
            },
        },
    })

    const versions = teachers.reduce((acc, teacher) => {
        const year = teacher.freezeVersion?.year || getCurrentAcademicYear()
        acc[year.toString()] = convertTeacherToDto(teacher)
        return acc
    }, {} as Record<string, UserVersionDto>)

    const response: UserDataResponseDto = {
        role: role || 0,
        versions,
    }

    if (!role) {
        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
        })
        response.role = user?.roleId || 0
    }

    return response
}

type TeacherSelection = Pick<Teacher, 'id'> & {
    freezeVersion: Pick<FreezeVersion, 'year'> | null
    relations: {
        course: Pick<Course, 'id' | 'name' | 'group' | 'onlyHours'>
    }[]
}

function convertTeacherToDto(teacher: TeacherSelection): UserVersionDto {
    return {
        teacherId: teacher.id,
        coursesById: teacher.relations.reduce((acc, relation) => {
            acc[relation.course.id] = relation.course
            return acc
        }, {} as Record<string, VersionCourseDto>),
        allCourses: teacher.relations.map((relation) => relation.course),
        courses: teacher.relations.filter((relation) => !relation.course.group).map((relation) => relation.course),
        groupCourses: teacher.relations.filter((relation) => relation.course.group).map((relation) => relation.course),
    }
}
