import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { updateMidtermExamTypeRequestSchema } from '~/dto/midtermExamType/updateMidtermExamType/request'
import { deleteMidtermExamType, getMidtermExamTypeList, updateMidtermExamType } from '~/service/midtermExamType'

const midtermExamTypeRouter = Router()

midtermExamTypeRouter.get('/', async (req, res, next) => {
    try {
        const midtermExamTypes = await getMidtermExamTypeList()
        res.json(midtermExamTypes)
    } catch (error) {
        next(error)
    }
})

midtermExamTypeRouter.post('/', async (req, res, next) => {
    try {
        const params = updateMidtermExamTypeRequestSchema.parse(req.body)
        await updateMidtermExamType(params)
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        next(error)
    }
})

midtermExamTypeRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        await deleteMidtermExamType(Number(id))
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        next(error)
    }
})

export { midtermExamTypeRouter }
