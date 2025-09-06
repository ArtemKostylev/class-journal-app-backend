import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { updateCourseRequestSchema } from '~/dto/course/updateCourse/request'
import { deleteCourse, getCourseList, updateCourse } from '~/service/course'

const courseRouter = Router()

courseRouter.get('/', async (_, res, next) => {
    try {
        const courses = await getCourseList()
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
