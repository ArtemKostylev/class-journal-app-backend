import { Router } from 'express'
import { getJournal, getGroupJournal, updateJournal } from '../service/journal'

const journalRouter = Router()

journalRouter.get('/', async (req, res, next) => {
    try {
        // TODO: add schema
        const { teacherId, courseId, year, month } = req.query

        const journal = await getJournal({
            teacherId: Number(teacherId),
            courseId: Number(courseId),
            year: Number(year),
            month: Number(month),
        })

        res.json(journal)
    } catch (error) {
        next(error)
    }
})

journalRouter.get('/group', async (req, res, next) => {
    try {
        // TODO: add schema
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
    } catch (error) {
        next(error)
    }
})

journalRouter.post('/', async (req, res, next) => {
    try {
        const { marks, quarterMarks } = req.body

        await updateJournal({ marks, quarterMarks })
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
})

export { journalRouter }
