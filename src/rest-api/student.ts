import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getStudentListForTeacherRequestSchema } from '~/dto/student/getStudentListForTeacher/request'
import { updateStudentRequestSchema } from '~/dto/student/updateStudent/request'
import { deleteStudent, getStudentList, getStudentListForTeacher, updateStudent } from '~/service/student'

const studentRouter = Router()

studentRouter.get('/', async (_, res, next) => {
    try {
        const students = getStudentList()
        res.json(students)
    } catch (error) {
        next(error)
    }
})

studentRouter.get('/forTeacher', async (req, res, next) => {
    try {
        const params = getStudentListForTeacherRequestSchema.parse(req.query)
        const student = await getStudentListForTeacher(params.teacherId)
        res.json(student)
    } catch (error) {
        next(error)
    }
})

studentRouter.post('/', async (req, res, next) => {
    try {
        const body = updateStudentRequestSchema.parse(req.body)
        await updateStudent(body)
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        next(error)
    }
})

studentRouter.delete('/:id', async (req, res, next) => {
    try {
        await deleteStudent(Number(req.params.id))
        res.sendStatus(StatusCodes.NO_CONTENT)
    } catch (error) {
        next(error)
    }
})

export { studentRouter }
