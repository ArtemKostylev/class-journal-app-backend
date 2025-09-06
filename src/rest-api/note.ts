import { Router } from 'express'
import { noteService } from '../service/note'
import { StatusCodes } from 'http-status-codes'

const noteRouter = Router()

noteRouter.get('/', async (req, res, next) => {
    try {
        const { courseId, teacherId, year } = req.query

        const note = await noteService.getNote({
            courseId: Number(courseId),
            teacherId: Number(teacherId),
            year: Number(year),
        })

        res.json(note)
    } catch (error) {
        next(error)
    }
})

noteRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body
        await noteService.updateNote(body)
        res.send(StatusCodes.OK)
    } catch (error) {
        next(error)
    }
})

export { noteRouter }
