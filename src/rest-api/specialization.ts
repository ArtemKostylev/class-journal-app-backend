import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { updateSpecializationRequestSchema } from '~/dto/specialization/updateSpecialization/request'
import { getSpecializationList, updateSpecialization, deleteSpecialization } from '~/service/specialization'

const specializationRouter = Router()

specializationRouter.get('/', async (_, res, next) => {
    try {
        const specializationList = await getSpecializationList()
        res.json(specializationList)
    } catch (error) {
        next(error)
    }
})

specializationRouter.post('/', async (req, res, next) => {
    try {
        const data = updateSpecializationRequestSchema.parse(req.body)
        await updateSpecialization(data)
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        next(error)
    }
})

specializationRouter.delete('/:id', async (req, res, next) => {
    try {
        await deleteSpecialization(Number(req.params.id))
        res.sendStatus(StatusCodes.NO_CONTENT)
    } catch (error) {
        next(error)
    }
})

export default specializationRouter
