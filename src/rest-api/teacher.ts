import { Router } from "express";
import { teacherService } from "../service/teacher";
import { StatusCodes } from "http-status-codes";

const teacherRouter = Router();

teacherRouter.get('/', async (_, res) => {
    const teachers = await teacherService.getAllTeachers();
    res.json(teachers);
});

teacherRouter.post('/', async (req, res) => {
    const teacher = await teacherService.createTeacher(req.body);
    res.json(teacher);
});

teacherRouter.put('/:id', async (req, res) => {
    const teacher = await teacherService.updateTeacher(req.body);
    res.json(teacher);
});

teacherRouter.delete('/:id', async (req, res) => {
    await teacherService.deleteTeacher(parseInt(req.params.id));
    res.sendStatus(StatusCodes.NO_CONTENT);
});

export { teacherRouter };