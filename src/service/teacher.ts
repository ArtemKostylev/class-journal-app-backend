import { db } from "../db";

interface UpdateTeacherParams {
    id: number;
    name: string;
    surname: string;
    parent: string;
}

interface CreateTeacherParams {
    name: string;
    surname: string;
    parent: string;
}

class TeacherService {
    public async updateTeacher(args: UpdateTeacherParams) {
        const {id, name, surname, parent} = args;

        const updatedTeacher = await db.teacher.update({
          where: {
            id,
          },
          data: {
            name,
            surname,
            parent,
          },
        });

        return updatedTeacher;
    }
      
    public async deleteTeacher(id: number) {
        await db.teacher.delete({
          where: {
            id,
          },
        });
    }
      
    public async createTeacher(args: CreateTeacherParams) {
        const {name, surname, parent} = args;

        const createdTeacher = await db.teacher.create({
          data: {
            name,
            surname,
            parent,
          },
        });

        return createdTeacher;
    }

    public async getAllTeachers() {
        const teachers = await db.teacher.findMany({
          where: {
              freezeVersionId: null
          },
          include: {
              relations: {
                  distinct: ['courseId'],
                  select: {
                      course: true,
                  },
              },
          },
      });

      return teachers;
    }
}

export const teacherService = new TeacherService();