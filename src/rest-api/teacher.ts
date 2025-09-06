import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { updateTeacherRequestSchema } from '~/dto/teacher/updateTeacher/request'
import { deleteTeacher, getTeacherList, updateTeacher } from '~/service/teacher'

const teacherRouter = Router()

teacherRouter.get('/', async (_, res, next) => {
    try {
        const teachers = await getTeacherList()
        res.json(teachers)
    } catch (error) {
        next(error)
    }
})

teacherRouter.post('/', async (req, res, next) => {
    try {
        const body = updateTeacherRequestSchema.parse(req.body)
        const teacher = await updateTeacher(body)
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        next(error)
    }
})

teacherRouter.delete('/:id', async (req, res, next) => {
    try {
        await deleteTeacher(parseInt(req.params.id))
        res.sendStatus(StatusCodes.NO_CONTENT)
    } catch (error) {
        next(error)
    }
})

export { teacherRouter }
