export interface VersionCourseDto {
    id: number
    name: string | null
    group: boolean
    onlyHours: boolean | null
    freezeVersion?: {
        id: number
        year: number
    }
}

export interface UserVersionDto {
    teacherId: number
    coursesById: Record<string, VersionCourseDto>
    allCourses: VersionCourseDto[]
    courses: VersionCourseDto[]
    groupCourses: VersionCourseDto[]
}

export interface UserDataResponseDto {
    role: number
    versions: Record<string, UserVersionDto>
}
