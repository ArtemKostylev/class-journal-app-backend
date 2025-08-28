import { Router } from 'express'
import { getJournal, getGroupJournal, updateJournal } from '../service/journal'

const journalRouter = Router()

journalRouter.get('/', async (req, res) => {
    const { teacherId, courseId, year, month } = req.query

    const teacherIdParam = Number(teacherId)
    const courseIdParam = Number(courseId)
    const yearParam = Number(year)
    const monthParam = Number(month)

    if (isNaN(teacherIdParam) || isNaN(courseIdParam) || isNaN(yearParam) || isNaN(monthParam)) {
        res.status(400).json({ error: 'Invalid parameters' })
        return
    }

    const journal = await getJournal({
        teacherId: teacherIdParam,
        courseId: courseIdParam,
        year: yearParam,
        month: monthParam,
    })

    res.json(journal)
})

journalRouter.get('/group', async (req, res) => {
    const { teacherId, courseId, year, period } = req.query

    const teacherIdParam = Number(teacherId)
    const courseIdParam = Number(courseId)
    const yearParam = Number(year)
    const periodParam = String(period)

    const journal = await getGroupJournal({
        teacherId: teacherIdParam,
        courseId: courseIdParam,
        year: yearParam,
        period: periodParam,
    })

    res.json(journal)
})

journalRouter.post('/', async (req, _) => {
    const { marks, quarterMarks } = req.body

    await updateJournal({ marks, quarterMarks })
})

export { journalRouter }
