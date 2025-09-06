export interface GetCourseListResponseDto {
    id: number
    name: string
    group: boolean | null
    excludeFromReport: boolean | null
    onlyHours: boolean | null
    onlyGroups: boolean | null
}
