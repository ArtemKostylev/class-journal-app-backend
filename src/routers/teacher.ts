import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { updateTeacherRequestSchema } from '~/dto/teacher/updateTeacher/request'
import { deleteTeacher, getTeacherList, getTeacherListForRelations, updateTeacher } from '~/service/teacher'
import { getTeacherListRequestSchema } from '~/dto/teacher/getTeacherList/request'

const teacherRouter = Router()

teacherRouter.get('/list', async (req, res, next) => {
    try {
        const query = getTeacherListRequestSchema.parse(req.query)
        const teachers = await getTeacherList(query)
        res.json(teachers)
    } catch (error) {
        next(error)
    }
})

teacherRouter.get('/forRelations', async (_, res, next) => {
    try {
        const teachers = await getTeacherListForRelations()
        res.json(teachers)
    } catch (error) {
        next(error)
    }
})

teacherRouter.post('/', async (req, res, next) => {
    try {
        const body = updateTeacherRequestSchema.parse(req.body)
        await updateTeacher(body)
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
