import { Router } from 'express'
import { groupConsultService } from '../service/groupConsult'

const groupConsultRouter = Router()

groupConsultRouter.get('/', async (req, res, next) => {
    try {
        const { teacherId, courseId, year } = req.query

        const teacherIdParam = Number(teacherId)
        const courseIdParam = Number(courseId)
        const yearParam = Number(year)

        if (isNaN(teacherIdParam) || isNaN(courseIdParam) || isNaN(yearParam)) {
            res.status(400).json({ error: 'Invalid parameters' })
            return
        }

        const groupConsults = await groupConsultService.getAllGroupConsults({
            teacherId: teacherIdParam,
            courseId: courseIdParam,
            year: yearParam,
        })

        res.json(groupConsults)
    } catch (error) {
        next(error)
    }
})

groupConsultRouter.post('/', async (req, res, next) => {
    try {
        const { consults, teacher, course } = req.body

        await groupConsultService.updateGroupConsults({ consults, teacher, course })
        res.status(200)
    } catch (error) {
        next(error)
    }
})

groupConsultRouter.delete('/', async (req, res, next) => {
    try {
        const { ids } = req.body

        await groupConsultService.deleteGroupConsults(ids)
        res.status(200)
    } catch (error) {
        next(error)
    }
})

export { groupConsultRouter }
