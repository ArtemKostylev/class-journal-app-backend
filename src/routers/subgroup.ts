import { Request, Response, Router } from 'express'
import { subgroupService } from '../service/subgroup'
import { StatusCodes } from 'http-status-codes'

const subgroupRouter = Router()

// TODO: add schema
subgroupRouter.get('/', async (req, res, next) => {
    try {
        const { teacherId, courseId } = req.query
        const subgroups = await subgroupService.fetchSubgroups({ teacherId: Number(teacherId), courseId: Number(courseId) })
        res.json(subgroups)
    } catch (error) {
        next(error)
    }
})

subgroupRouter.post('/', async (req, res, next) => {
    try {
        await subgroupService.updateSubgroups(req.body)
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        next(error)
    }
})

export default subgroupRouter
