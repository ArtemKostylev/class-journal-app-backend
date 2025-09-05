import { Router } from 'express'
import { updateSpecializationRequestSchema } from '~/dto/specialization/updateSpecialization/request'
import { getSpecializationList, updateSpecialization, deleteSpecialization } from '~/service/specialization'

const specializationRouter = Router()

specializationRouter.get('/', async (req, res, next) => {
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
        res.status(200).send()
    } catch (error) {
        next(error)
    }
})

specializationRouter.delete('/:id', async (req, res, next) => {
    try {
        await deleteSpecialization(Number(req.params.id))
        res.status(204).send()
    } catch (error) {
        next(error)
    }
})

export default specializationRouter
