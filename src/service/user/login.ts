import { db } from '~/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { LoginRequestDto } from '~/dto/user/login/request'
import { LoginResponseDto, type UserVersionDto, type VersionCourseDto } from '~/dto/user/login/response'
import type { Course, FreezeVersion, Teacher } from '@prisma/client'
import { getCurrentAcademicYear } from '~/utils/academicDate'

export async function login(params: LoginRequestDto): Promise<[string, LoginResponseDto]> {
    const { login, password } = params
    const secret = process.env.JWT_SECRET

    if (!secret) {
        throw new Error('Login error: JWT_SECRET is not set in env file')
    }

    const user = await db.user.findFirst({
        where: {
            login,
        },
    })

    if (!user) {
        throw new Error('Invalid credentials')
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) {
        throw new Error('Invalid credentials')
    }

    const token = jwt.sign({ id: user.id }, secret)
    const userData = await getUserData(user.id)

    const response: LoginResponseDto = {
        role: user.roleId,
        versions: userData,
    }

    return [token, response]
}

async function getUserData(userId: number): Promise<Record<string, UserVersionDto>> {
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

    return teachers.reduce((acc, teacher) => {
        const year = teacher.freezeVersion?.year || getCurrentAcademicYear()
        acc[year.toString()] = convertTeacherToDto(teacher)
        return acc
    }, {} as Record<string, UserVersionDto>)
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
        courses: teacher.relations
            .filter((relation) => !relation.course.group)
            .map((relation) => relation.course),
        groupCourses: teacher.relations
            .filter((relation) => relation.course.group)
            .map((relation) => relation.course),
    }
}
