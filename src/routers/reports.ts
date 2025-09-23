import { Router } from 'express'
//import { getAnnualReport } from '~/service/reports/getAnnualReport'

export const reportsRouter = Router()

reportsRouter.get('/annual', async (_, res, next) => {
    try {
        //const link = await getAnnualReport()
        const link = 'https://www.google.com'
        res.send(link)
    } catch (error) {
        next(error)
    }
})
