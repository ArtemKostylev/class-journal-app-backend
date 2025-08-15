import { Router } from 'express'
import { groupConsultService } from '../service/groupConsult'

const groupConsultRouter = Router()

groupConsultRouter.get('/', async (req, res) => {
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
})

groupConsultRouter.post('/', async (req, res) => {
    const { groups, teacher, course } = req.body

    await groupConsultService.updateGroupConsults({ groups, teacher, course })
})

groupConsultRouter.delete('/', async (req, res) => {
    const { ids } = req.body

    await groupConsultService.deleteGroupConsults(ids)
})

export { groupConsultRouter }
