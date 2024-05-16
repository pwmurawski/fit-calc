import puppeteer, { Browser } from 'puppeteer';
import prismaClient from '../../../lib/app/prisma-client';
import { ApiError } from 'next/dist/server/api-utils';
import { HttpStatusCode } from 'axios';
import { convertCookies } from 'helpers/convertCookies';
import { summaryPdfValidationSchema } from 'lib/validation/pdfValidationSchema';
import { validation } from '../validation';
import { getSummaryByDateRange } from './summary';
import { getDayData } from './daysData';
import { PdfType } from 'types/pdf';
import { eachDayOfInterval } from 'date-fns';

export const checkPdfExist = async (token: string) => {
    const existingPdfData = await prismaClient.pdfData.findUnique({ where: { id: token } });
    if (!existingPdfData) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Nie znaleziono pdfa!');
    }
    return existingPdfData;
};

export const generatedPdf = async (token: string) => {
    await checkPdfExist(token);
    const pdfData = await prismaClient.pdfData.update({ where: { id: token }, data: { generated: true } });
    return pdfData;
};

export const getSummaryPdfData = async (userId: string, token: string) => {
    const data = await checkPdfExist(token);
    const pdfData = await validation(summaryPdfValidationSchema.validate(data));
    const startDate = pdfData.data.date.start;
    const endDate = pdfData.data.date.end;

    const summary = await getSummaryByDateRange(userId, startDate, endDate);

    const daysData = [];
    const datesArray = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });
    for (const date of datesArray) {
        const dayData = await getDayData(userId, date.toISOString());
        daysData.push({ date: date.toISOString(), ...dayData });
    }

    return { action: data.action as PdfType, startDate, endDate, summary, daysData };
};

export const generatePdf = async (
    token: string,
    tokenExpirationDate: Date,
    action: string,
    date: {
        start: Date;
        end: Date;
    },
    cookies: Partial<{
        [key: string]: string;
    }>,
) => {
    await prismaClient.pdfData.create({
        data: {
            id: String(token),
            action: action,
            data: JSON.parse(
                JSON.stringify({
                    date: {
                        start: date.start,
                        end: date.end,
                    },
                }),
            ),
            generated: false,
            expires: tokenExpirationDate,
        },
    });

    const browser: Browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setCookie(...convertCookies(cookies, `${process.env.NEXT_PUBLIC_BASE_URL}`));

    await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}/generate-pdf/${token}`, { waitUntil: 'networkidle0' });

    await page.waitForSelector('#generate-pdf');
    await page.emulateMediaType('screen');
    const pdf = await page.pdf({
        margin: { top: '15px', left: '20px', right: '20px' },
        format: 'A4',
        printBackground: true,
    });
    await browser.close();
    return pdf;
};
