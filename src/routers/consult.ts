import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { consultListRequestSchema } from '~/dto/consult/getConsultList/request'
import { getConsultList, updateConsults } from '~/service/consult'

const consultRouter = Router()

consultRouter.get('/', async (req, res, next) => {
    try {
        const query = consultListRequestSchema.parse(req.query)
        const consults = await getConsultList(query)

        res.json(consults)
    } catch (error) {
        next(error)
    }
})

consultRouter.post('/', async (req, res, next) => {
    try {
        const { consults } = req.body

        await updateConsults({ consults })
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        next(error)
    }
})

export { consultRouter }
