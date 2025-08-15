import { Router } from 'express'
import { consultService } from '../service/consult'

const consultRouter = Router()

consultRouter.get('/', async (req, res) => {
    const { teacherId, courseId, year } = req.query

    const teacherIdParam = Number(teacherId)
    const courseIdParam = Number(courseId)
    const yearParam = Number(year)

    if (isNaN(teacherIdParam) || isNaN(courseIdParam) || isNaN(yearParam)) {
        res.status(400).json({ error: 'Invalid parameters' })
        return
    }

    const consults = await consultService.getAllConsults({
        teacherId: teacherIdParam,
        courseId: courseIdParam,
        year: yearParam,
    })

    res.json(consults)
})

consultRouter.post('/', async (req, res) => {
    const { consults } = req.body

    await consultService.updateConsults({ consults })
})

consultRouter.delete('/', async (req, res) => {
    const { ids } = req.body

    await consultService.deleteConsults(ids)
})

export { consultRouter }
