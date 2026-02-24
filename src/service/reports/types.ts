export interface ReportTableRow {
    studentName: string;
    marks: string[];
}

export interface ReportTable {
    tableName: string;
    tableHeaders: string[];
    tableRows: Record<string, ReportTableRow>;
}