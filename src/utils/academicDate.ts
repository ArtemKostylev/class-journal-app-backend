import { ACADEMIC_PERIODS, type AcademicPeriods } from '../const/academicPeriods'
import type { Months } from '../const/months'
import { FIRST_PERIOD_MONTHS } from '../const/monthsInPeriods'

export const academicYearToCalendarByPeriod = (year: number, period: AcademicPeriods): number => {
    if (period === ACADEMIC_PERIODS.FIRST) {
        return Number(year)
    }
    return Number(year) + 1
}

export const academicYearToCalendarByMonth = (year: number, month: Months): number => {
    const isFirstPeriod = FIRST_PERIOD_MONTHS.includes(month)

    if (isFirstPeriod) {
        return Number(year)
    }

    return Number(year) + 1
}

export const getCurrentAcademicYear = () => {
    return new Date().getMonth() > 7 ? new Date().getFullYear() : new Date().getFullYear() - 1
}
