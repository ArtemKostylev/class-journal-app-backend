import { Period, Program, type QuaterMark, type Specialization, type Student } from '@prisma/client';
import { db } from '~/db';
import { getCurrentAcademicYear } from '~/utils/academicDate';
import type { ReportTable, ReportTableRow } from './types';

type ReportSelection = {
    quaterMark: QuaterMark[];
    student: (Student & { specialization: Specialization | null }) | null;
    courseId: number;
};

const EMPTY_TABLE: ReportTable = {
    tableName: '',
    tableHeaders: [],
    tableRows: {},
};

const EMPTY_ROW: ReportTableRow = {
    studentName: '',
    marks: [],
};

function getTableName(record: ReportSelection) {
    const classNum = record.student?.class;
    const spec = record.student?.specialization?.name;
    const program = record.student?.program;

    if (program === Program.OP)
        return `${classNum} класс ОБЩЕРАЗВИВАЮЩИЕ ОП в области музыкального искусства (${spec})`;

    return `<p>${classNum} класс ${spec} (предпрофессиональная ОП)</p>`;
}

function getStudentName(record: ReportSelection) {
    const name = record.student?.name;
    const surname = record.student?.surname;

    return `${name} ${surname}`;
}

function getPeriodNum(period: Period) {
    switch (period) {
        case Period.first:
            return 0;
        case Period.second:
            return 1;
        case Period.third:
            return 2;
        case Period.fourth:
            return 3;
        case Period.year:
            return 4;
    }
}

export async function getAnnualReport() {
    const year = getCurrentAcademicYear();

    const allCourses = await db.course.findMany({
        where: { freezeVersionId: null, excludeFromReport: false },
        select: { id: true, name: true },
    });

    const allCoursesNames = allCourses.reduce(
        (acc, curr) => {
            acc[curr.id] = curr.name;
            return acc;
        },
        {} as Record<number, string | null>,
    );

    const reportData = await db.teacher_Course_Student.findMany({
        where: {
            archived: false,
            freezeVersionId: null,
            course: { excludeFromReport: false },
        },
        select: {
            quaterMark: {
                where: {
                    year,
                },
            },
            student: { include: { specialization: true } },
            courseId: true,
        },
    });

    const tables: Record<string, ReportTable> = {};

    reportData.forEach((record: ReportSelection) => {
        const tableName = getTableName(record);
        let table = tables[tableName];

        if (!table) {
            table = { ...EMPTY_TABLE };
            table.tableName = tableName;
            tables[tableName] = table;
        }

        const course = allCoursesNames[record.courseId];
        let courseIndex = table.tableHeaders.findIndex((it) => it === (course || ''));

        if (courseIndex < 0) {
            table.tableHeaders.push(course || '');
            courseIndex = table.tableHeaders.length - 1;
        }

        const studentName = getStudentName(record);
        let tableRow = table.tableRows[studentName];

        if (!tableRow) {
            tableRow = { ...EMPTY_ROW };
            tableRow.studentName = studentName;
            table.tableRows[studentName] = tableRow;
        }

        record.quaterMark.forEach((mark) => {
            const quarterNum = getPeriodNum(mark.period);
            const insertionIndex = courseIndex * 5 + quarterNum;
            tableRow.marks[insertionIndex] = mark.mark;
        });
    });


    return `https://akostylev.com/new/files/vedomost_${year}.docx`;
}
