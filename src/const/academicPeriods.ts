export const ACADEMIC_PERIODS = {
    FIRST: 'firstHalf',
    SECOND: 'secondHalf',
} as const

export type AcademicPeriods = (typeof ACADEMIC_PERIODS)[keyof typeof ACADEMIC_PERIODS]
