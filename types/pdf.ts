import { SummaryCalorieMacroData } from './Summary';
import { MealsData } from './Meal';

export interface BodyGeneratePdf {
    action: string;
    date: {
        start: Date;
        end: Date;
    };
}

export interface SummaryPdfData {
    action: PdfType.Summary;
    startDate: string;
    endDate: string;
    summary: {
        summaryData: SummaryCalorieMacroData;
        dailyGoals: {
            kcal: number;
            protein: number;
            fat: number;
            carbs: number;
        };
    };
    daysData: {
        date: string;
        mealsData: MealsData[];
        summaryData: SummaryCalorieMacroData;
    }[];
}

export interface ResponseGeneratePdf {
    pdfData: SummaryPdfData;
}

export interface GeneratePdfData {
    id: string;
    action: string;
    data: {
        date: {
            start: string;
            end: string;
        };
    };
    generated: boolean;
    expires: string;
}

export enum PdfType {
    Summary = 'summary-pdf',
}
