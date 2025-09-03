import { Router } from 'express'
import { getReplacementListRequestSchema } from '~/dto/replacement/getReplacementList/request'
import { updateReplacementsRequestSchema } from '~/dto/replacement/updateReplacements/request'
import { getReplacementList, updateReplacements } from '~/service/replacement'

const replacementRouter = Router()

replacementRouter.get('/', async (req, res) => {
    const query = getReplacementListRequestSchema.parse(req.query)
    const replacements = await getReplacementList(query)
    res.json(replacements)
})
replacementRouter.post('/', async (req, res) => {
    const replacements = updateReplacementsRequestSchema.parse(req.body)
    await updateReplacements(replacements)
    res.json(replacements)
})

export { replacementRouter }
