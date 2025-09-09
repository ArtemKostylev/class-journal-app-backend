import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { updateCourseStudentsRequestSchema } from '~/dto/relations/updateCourseStudents/request'
import { updateTeacherCoursesRequestSchema } from '~/dto/relations/updateTeacherCourses/request'
import { getRelationsData, updateCourseStudents, updateTeacherCourses } from '~/service/relations'

const relationsRouter = Router()

relationsRouter.get('/', async (_, res, next) => {
    try {
        const relations = await getRelationsData()
        res.json(relations)
    } catch (error) {
        next(error)
    }
})

relationsRouter.post('/updateCourseStudents', async (req, res, next) => {
    try {
        const body = updateCourseStudentsRequestSchema.parse(req.body)
        await updateCourseStudents(body)
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        next(error)
    }
})

relationsRouter.post('/updateTeacherCourses', async (req, res, next) => {
    try {
        const body = updateTeacherCoursesRequestSchema.parse(req.body)
        await updateTeacherCourses(body)
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        next(error)
    }
})

export { relationsRouter }