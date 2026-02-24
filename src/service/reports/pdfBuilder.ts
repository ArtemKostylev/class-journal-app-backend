import jsPDF from 'jspdf';
import type { ReportTable } from './types';

const PERIOD_HEADERS = ['I', 'II', 'III', 'IV', 'год'];

export function buildAnnualReportPdf(data: Record<string, ReportTable>) {
    const document = new jsPDF({
        orientation: 'landscape',
    });

    Object.values(data).forEach(() => {
        
    });
}
