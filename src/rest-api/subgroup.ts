import { Request, Response, Router } from 'express'
import { subgroupService } from '../service/subgroup'

const subgroupRouter = Router()

subgroupRouter.get('/', async (req: Request, res: Response, next) => {
    try {
        const { teacherId, courseId } = req.query
        const subgroups = await subgroupService.fetchSubgroups({ teacherId: Number(teacherId), courseId: Number(courseId) })
        res.json(subgroups)
    } catch (error) {
        next(error)
    }
})

subgroupRouter.post('/', async (req: Request, res: Response, next) => {
    try {
        await subgroupService.updateSubgroups(req.body)
        res.json({ message: 'Subgroups updated' })
    } catch (error) {
        next(error)
    }
})

export default subgroupRouter
