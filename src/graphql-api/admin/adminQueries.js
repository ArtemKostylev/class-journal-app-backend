const fs = require('fs')
const htmlDocx = require('html-docx-js')
const { buildHtml } = require('../../helpers/htmlBuilder')

const fetchFullInfo = async (parent, args, context) => {
    const { userId } = context
    const teachers = await context.prisma.teacher.findMany({
        where: {
            freezeVersionId: null,
        },
    })
    const students = await context.prisma.student.findMany({
        where: {
            freezeVersionId: null,
        },
        include: {
            specialization: true,
        },
    })
    const courses = await context.prisma.course.findMany({
        where: {
            freezeVersionId: null,
        },
    })
    const specializations = await context.prisma.specialization.findMany({
        where: {
            freezeVersionId: null,
        },
    })
    const relations = await context.prisma.teacher_Course_Student.findMany({
        where: {
            freezeVersionId: null,
        },
        include: {
            teacher: true,
            student: true,
            course: true,
        },
    })
    return {
        teachers,
        students,
        courses,
        relations,
        specializations,
    }
}

module.exports = {
    fetchFullInfo,
}
