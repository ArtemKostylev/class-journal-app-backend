import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getGroupConsultListRequestSchema } from '~/dto/groupConsult/getGroupConsultList/request'
import { getGroupConsultList, updateGroupConsult } from '../service/groupConsult'
import { updateGroupConsultRequestSchema } from '~/dto/groupConsult/updateGroupConsult/request'

const groupConsultRouter = Router()

groupConsultRouter.get('/', async (req, res, next) => {
    try {
        const params = getGroupConsultListRequestSchema.parse(req.query)
        const groupConsults = await getGroupConsultList(params)

        res.json(groupConsults)
    } catch (error) {
        next(error)
    }
})

groupConsultRouter.post('/', async (req, res, next) => {
    try {
        const body = updateGroupConsultRequestSchema.parse(req.body)
        await updateGroupConsult(body)
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        next(error)
    }
})

export { groupConsultRouter }
