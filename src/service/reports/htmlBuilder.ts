const periods = ['first', 'second', 'third', 'fourth', 'year']

const PERIOD_MAP: Record<string, string> = {
    first: 'I',
    second: 'II',
    third: 'III',
    fourth: 'IV',
    year: 'год',
}

const addRow = (children: string[]) => `<tr>${children.join('')}</tr>`

const addHeader = (text: string, className: string) => `<th class="${className}">${text}</th>`

const addTallHeader = (text: string, className: string) => `<th rowspan="2" class="${className}">${text}</th>`

const addLongHeader = (text: string, className: string) => `<th colspan="5" class="${className}">${text}</th>`

const addCell = (text: string, className: string) => `<td class="${className}">${text}</td>`

const addTable = (title: string, header: string[], body: string[]) => `
    <div>
        ${title}
        <table class="table">
            <thead>${header.join('')}</thead>
            <tbody>
                ${body.join('')}
            </tbody>
        </table>
    </div>
`

const addTitle = (text: string) => {
    const [course, spec, program] = text.split('/')

    if (program === 'OP') return `<p>${course} класс ОБЩЕРАЗВИВАЮЩИЕ ОП в области музыкального искусства (${spec})</p>`

    return `<p>${course} класс ${spec} (предпрофессиональная ОП)</p>`
}

const styles = `
    <style>
        .base {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin: 50px !important;
        }

        .table {
            margin-bottom: 20px;
            border-collapse: collapse;
            max-width: 100%;
        }
        .header {
            font-weight: normal;
            border-top: none;
            border: 1px solid black;
            border-collapse: collapse;
        }
        .mark {
            border-top: none;
            border: 1px solid black;
            border-collapse: collapse;
            padding: 0px;
            max-width: 30px !important;
            width: 30px !important;
            margin-right: 2rem;
            margin-left: 2rem;
        }
    </style>
`

const createDocument = (tables: string[]) => `
    <!DOCTYPE html>
    <html>
        <body>
            ${styles}
            <div class="base">
                ${tables.join('')}
            </div>
        </body>
    </html>
`

const createRow = (key: string, value: any, index: number, courses: { id: number; name: string }[]) => {
    return addRow([
        addCell(String(index + 1), 'header'),
        addCell(key, 'header'),
        ...courses
            .map((it) => {
                const courseMarks = new Map(
                    value.find((item: any) => item.courseId === it.id)?.marks?.map((mark: any) => [mark.period, mark.mark])
                )
                return periods.map((period) => {
                    return addCell(String(courseMarks.get(period) || ''), 'mark')
                })
            })
            .flat(),
    ])
}

const createHeader = (courses: { id: number; name: string }[]) => {
    return [
        addRow([
            addTallHeader('№', 'header'),
            addTallHeader('Фамилия, имя учащегося', 'header'),
            ...courses.map((it) => addLongHeader(it.name, 'header')),
        ]),
        addRow([...courses.map(() => periods.map((period: string) => addHeader(PERIOD_MAP[period], 'header'))).flat()]),
    ]
}

const createTable = (title: string, courses: { id: number; name: string }[], marks: Map<string, any>) => {
    const body = [...Array.from(marks).map(([key, value], index) => createRow(key, value, index, courses))]
    return addTable(addTitle(title), createHeader(courses), body)
}

const buildHtml = (mappedData: Map<string, any>) =>
    createDocument([...Array.from(mappedData).map(([key, value]) => createTable(key, value.courses, value.studentMarks))])

export { buildHtml }
