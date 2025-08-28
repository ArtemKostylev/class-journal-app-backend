import { ACADEMIC_PERIODS, type AcademicPeriods } from '../const/academicPeriods'
import type { Months } from '../const/months'
import { FIRST_PERIOD_MONTHS } from '../const/monthsInPeriods'

export const academicYearToCalendarByPeriod = (year: number, period: AcademicPeriods) => {
    if (period === ACADEMIC_PERIODS.FIRST) {
        return year
    }
    return year + 1
}

export const academicYearToCalendarByMonth = (year: number, month: Months) => {
    const isFirstPeriod = FIRST_PERIOD_MONTHS.includes(month)

    if (isFirstPeriod) {
        return year
    }

    return year + 1
}
