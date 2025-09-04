import { Router } from 'express'
import { getReplacementListRequestSchema } from '~/dto/replacement/getReplacementList/request'
import { updateReplacementsRequestSchema } from '~/dto/replacement/updateReplacements/request'
import { getReplacementList, updateReplacements } from '~/service/replacement'

const replacementRouter = Router()

replacementRouter.get('/', async (req, res, next) => {
    try {
        const query = getReplacementListRequestSchema.parse(req.query)
        const replacements = await getReplacementList(query)
        res.json(replacements)
    } catch (error) {
        next(error)
    }
})
replacementRouter.post('/', async (req, res, next) => {
    try {
        const replacements = updateReplacementsRequestSchema.parse(req.body)
        await updateReplacements(replacements)
        res.json(replacements)
    } catch (error) {
        next(error)
    }
})

export { replacementRouter }
