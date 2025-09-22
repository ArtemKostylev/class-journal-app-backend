import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { offsetRequestSchema } from '~/dto/shared/offsetRequest'
import { updateCourseRequestSchema } from '~/dto/course/updateCourse/request'
import { deleteCourse, getCourseList, getCourseListForRelations, updateCourse } from '~/service/course'

const courseRouter = Router()

courseRouter.get('/list', async (req, res, next) => {
    try {
        const courses = await getCourseList(offsetRequestSchema.parse(req.query))
        res.json(courses)
    } catch (error) {
        next(error)
    }
})

courseRouter.get('/forRelations', async (_, res, next) => {
    try {
        const courses = await getCourseListForRelations()
        res.json(courses)
    } catch (error) {
        next(error)
    }
})

courseRouter.post('/', async (req, res, next) => {
    try {
        const body = updateCourseRequestSchema.parse(req.body)
        await updateCourse(body)
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        next(error)
    }
})

courseRouter.delete('/:id', async (req, res, next) => {
    try {
        await deleteCourse(Number(req.params.id))
        res.sendStatus(StatusCodes.NO_CONTENT)
    } catch (error) {
        next(error)
    }
})

export { courseRouter }
