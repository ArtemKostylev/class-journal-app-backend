import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getStudentListForTeacherRequestSchema } from '~/dto/student/getStudentListForTeacher/request'
import { updateStudentRequestSchema } from '~/dto/student/updateStudent/request'
import { deleteStudent, getStudentList, getStudentListForRelations, getStudentListForTeacher, updateStudent } from '~/service/student'
import { getStudentListRequestSchema } from '~/dto/student/getStudentList/request'

const studentRouter = Router()

studentRouter.post('/list', async (req, res, next) => {
    try {
        const params = getStudentListRequestSchema.parse(req.body)
        const students = await getStudentList(params)
        res.json(students)
    } catch (error) {
        next(error)
    }
})

studentRouter.get('/forRelations', async (_, res, next) => {
    try {
        const students = await getStudentListForRelations()
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
