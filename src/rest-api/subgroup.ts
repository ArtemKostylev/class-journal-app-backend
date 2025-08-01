import { Request, Response, Router } from "express";
import { subgroupService } from "../service/subgroup";

const subgroupRouter = Router();

subgroupRouter.get("/", async (req: Request, res: Response) => {
    const {teacherId, courseId} = req.query;
    const subgroups = await subgroupService.fetchSubgroups({teacherId: Number(teacherId), courseId: Number(courseId)});
    res.json(subgroups);
});

subgroupRouter.post("/", async (req: Request, res: Response) => {
    await subgroupService.updateSubgroups(req.body);
    res.json({message: "Subgroups updated"});
});

export default subgroupRouter;