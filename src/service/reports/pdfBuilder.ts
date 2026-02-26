import type { ReportTable } from './types';
const { jsPDF } = require('jspdf');

const PERIOD_HEADERS_HTML = `
    <th>I</th>
    <th>II</th>
    <th>III</th>
    <th>IV</th>
    <th>год</th>
`;

function addMarkCells(length: number, marks: string[]) {
    let result = '';

    for (let i = 0; i < length; i++) {
        result += `<td>${marks[i] || ''}</td>`;
    }

    return result;
}

function buildAnnualReportHtml(data: ReportTable[]) {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <style>
                .base {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    margin: 50px;
                }

                table {
                    margin-bottom: 20px;
                    border-collapse: collapse;
                    max-width: 100%;
                }

                th {
                    font-weight: normal;
                    border-top: none;
                    border: 1px solid black;
                    border-collapse: collapse;
                }

                td {
                    border-top: none;
                    border: 1px solid black;
                    border-collapse: collapse;
                    padding: 0px;
                    max-width: 30px;
                    width: 30px;
                    margin-right: 2rem;
                    margin-left: 2rem;
                }

                .long {
                    width: 200px;
                }
            </style>
        </head>
        <body>
            <div class="base">
                ${data
                    .map(
                        (table) => `
                        <div>
                            <p>${table.tableName}</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th rowspan="2">№</th>
                                        <th rowspan="2"  class="long">Фамилия, имя учащегося</th>
                                        ${table.tableHeaders
                                            .map(
                                                (header) => `
                                            <th colspan="5">${header}</th>
                                        `,
                                            )
                                            .join('')}
                                    </tr>
                                    <tr>
                                        ${table.tableHeaders.map(() => PERIOD_HEADERS_HTML).join('')}
                                    </tr>
                                </thead>
                                <tbody>
                                    ${Object.values(table.tableRows)
                                        .map(
                                            (row, index) => `
                                        <tr>
                                            <td>${index + 1}</td>
                                            <td>${row.studentName}</td>
                                            ${addMarkCells(table.tableHeaders.length * 5, row.marks)}
                                        </tr>
                                    `,
                                        )
                                        .join('')}
                                </tbody>
                            </table>
                        </div>
                    `,
                    )
                    .join('')}
            </div>
        </body>
    </html>
    `;
}

export function getAnnualReportPdf(data: ReportTable[]) {
    const html = buildAnnualReportHtml(data);

    const pdf = new jsPDF({
        orientation: 'landsape',
    });

    pdf.html(html, {
        callback: (doc: any) => {
            doc.save('./test.pdf');
        },
    });
}
