import { Router } from 'express'
import { getMidtermExamListRequestSchema } from '~/dto/midtermExam/getMidtermExamList/request'
import { updateMidtermExamRequestSchema } from '~/dto/midtermExam/updateMidtermExam/request'
import { deleteMidtermExam, getMidtermExamList, updateMidtermExam } from '~/service/midtermExam'

const midtermExamRouter = Router()

midtermExamRouter.get('/', async (req, res) => {
    const params = getMidtermExamListRequestSchema.parse(req.query)

    const midtermExams = await getMidtermExamList(params)

    res.json(midtermExams)
})

midtermExamRouter.post('/', async (req, res) => {
    const params = updateMidtermExamRequestSchema.parse(req.body)

    await updateMidtermExam(params)

    res.status(200)
})

midtermExamRouter.delete('/:id', async (req, res) => {
    const { id } = req.params

    await deleteMidtermExam({ id: Number(id) })

    res.status(200)
})

export { midtermExamRouter }
