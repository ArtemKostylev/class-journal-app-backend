import { Router } from 'express'
import { consultListRequestSchema } from '~/dto/consult/getConsultList/request'
import { getConsultList, updateConsults } from '~/service/consult'

const consultRouter = Router()

consultRouter.get('/', async (req, res) => {
    const query = consultListRequestSchema.parse(req.query)
    const consults = await getConsultList(query)

    res.json(consults)
})

consultRouter.post('/', async (req, res) => {
    const { consults } = req.body

    await updateConsults({ consults })
    res.status(200)
})

export { consultRouter }
