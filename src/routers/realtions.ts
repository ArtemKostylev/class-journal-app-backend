import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { updateRelationsRequestSchema } from '~/dto/relations/updateRelations/request'
import { getRelationsData, updateCourseRelations, updateStudentRelations } from '~/service/relations'

const relationsRouter = Router()

relationsRouter.get('/', async (_, res, next) => {
    try {
        const relations = await getRelationsData()
        res.json(relations)
    } catch (error) {
        next(error)
    }
})

relationsRouter.post('/updateCourseRelations', async (req, res, next) => {
    try {
        const body = updateRelationsRequestSchema.parse(req.body)
        await updateCourseRelations(body)
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        next(error)
    }
})

relationsRouter.post('/updateStudentRelations', async (req, res, next) => {
    try {
        const body = updateRelationsRequestSchema.parse(req.body)
        await updateStudentRelations(body)
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        next(error)
    }
})

export { relationsRouter }
