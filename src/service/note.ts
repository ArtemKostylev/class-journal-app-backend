import { db } from "../db";

interface UpdateNoteParams {
    noteId: number;
    text: string;
    year: number;
    teacherId: number;
    courseId: number;
}

interface GetNoteParams {
    courseId: number;
    teacherId: number;
    year: number;
}

interface Note {
    id: number;
    text: string;
}

class NoteService {
    public async updateNote(params: UpdateNoteParams): Promise<void> {
        const {noteId, text, year, teacherId, courseId} = params;

        await db.note.upsert({
            where: {
                id: noteId,
            },
            update: {
                text,
            },
            create: {
                text,
                year,
                teacherId,
                courseId,
            },
        });
    };

    public async getNote(params: GetNoteParams): Promise<Note | null> {
        const { courseId, teacherId, year } = params;

        const note = await db.note.findFirst({
            where: {
                courseId: courseId,
                teacherId: teacherId,
                year: year,
            },
        });

        if (!note) {
            return null;
        }

        return {
            id: note.id,
            text: note.text
        }
    };
      
}

export const noteService = new NoteService();