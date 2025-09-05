import { Router } from 'express'
import { getAnnualReport } from '~/service/reports/getAnnualReport'

export const reportsRouter = Router()

reportsRouter.get('/reports/annual', async (_, res) => {
    const link = await getAnnualReport()
    res.send(link)
})
