import { Router } from 'express'
import { updateMidtermExamTypeRequestSchema } from '~/dto/midtermExamType/updateMidtermExamType/request'
import { deleteMidtermExamType, getMidtermExamTypeList, updateMidtermExamType } from '~/service/midtermExamType'

const midtermExamTypeRouter = Router()

midtermExamTypeRouter.get('/', async (req, res) => {
    const midtermExamTypes = await getMidtermExamTypeList()
    res.json(midtermExamTypes)
})

midtermExamTypeRouter.post('/', async (req, res) => {
    const params = updateMidtermExamTypeRequestSchema.parse(req.body)
    await updateMidtermExamType(params)
    res.status(200)
})

midtermExamTypeRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    await deleteMidtermExamType(Number(id))
    res.status(200)
})

export { midtermExamTypeRouter }
