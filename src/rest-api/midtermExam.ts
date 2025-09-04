import { Router } from 'express'
import { getMidtermExamListRequestSchema } from '~/dto/midtermExam/getMidtermExamList/request'
import { updateMidtermExamRequestSchema } from '~/dto/midtermExam/updateMidtermExam/request'
import { deleteMidtermExam, getMidtermExamList, updateMidtermExam } from '~/service/midtermExam'

const midtermExamRouter = Router()

midtermExamRouter.get('/', async (req, res, next) => {
    try {
        const params = getMidtermExamListRequestSchema.parse(req.query)

        const midtermExams = await getMidtermExamList(params)

        res.json(midtermExams)
    } catch (error) {
        next(error)
    }
})

midtermExamRouter.post('/', async (req, res, next) => {
    try {
        const params = updateMidtermExamRequestSchema.parse(req.body)

        await updateMidtermExam(params)

        res.status(200)
    } catch (error) {
        next(error)
    }
})

midtermExamRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params

        await deleteMidtermExam({ id: Number(id) })

        res.status(200)
    } catch (error) {
        next(error)
    }
})

export { midtermExamRouter }
