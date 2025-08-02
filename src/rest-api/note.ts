import { Router, Request, Response } from "express";
import { noteService } from "../service/note";
import { StatusCodes } from "http-status-codes";

const noteRouter = Router();

noteRouter.get('/', async (req: Request, res: Response) => {
    const {courseId, teacherId, year} = req.query;

    const note = await noteService.getNote({
        courseId: Number(courseId), 
        teacherId: Number(teacherId), 
        year: Number(year)
    })

    res.json(note);
})

noteRouter.post('/', async (req: Request, res: Response) => {
    const body = req.body;
    await noteService.updateNote(body);
    res.send(StatusCodes.CREATED);
})

export {noteRouter}