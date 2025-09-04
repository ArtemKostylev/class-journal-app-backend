import { Router } from 'express'
import { teacherService } from '../service/teacher'
import { StatusCodes } from 'http-status-codes'

const teacherRouter = Router()

teacherRouter.get('/', async (_, res, next) => {
    try {
        const teachers = await teacherService.getAllTeachers()
        res.json(teachers)
    } catch (error) {
        next(error)
    }
})

teacherRouter.post('/', async (req, res, next) => {
    try {
        const teacher = await teacherService.createTeacher(req.body)
        res.json(teacher)
    } catch (error) {
        next(error)
    }
})

teacherRouter.put('/:id', async (req, res, next) => {
    try {
        const teacher = await teacherService.updateTeacher(req.body)
        res.json(teacher)
    } catch (error) {
        next(error)
    }
})

teacherRouter.delete('/:id', async (req, res, next) => {
    try {
        await teacherService.deleteTeacher(parseInt(req.params.id))
        res.sendStatus(StatusCodes.NO_CONTENT)
    } catch (error) {
        next(error)
    }
})

export { teacherRouter }
