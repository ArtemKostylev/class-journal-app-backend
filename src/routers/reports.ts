import { Router } from 'express'
import { getAnnualReport } from '~/service/reports/getAnnualReport'

export const reportsRouter = Router()

reportsRouter.get('/getAnnualReport', async (_, res, next) => {
    try {
        const link = await getAnnualReport()
        res.send(link)
    } catch (error) {
        next(error)
    }
})
