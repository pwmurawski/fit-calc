import { differenceInDays, parse } from 'date-fns';

export const countDaysBetweenDates = (startDate: string, endDate: string): number => {
    const parsedStartDate = parse(startDate, 'yyyy-MM-dd', new Date());
    const parsedEndDate = parse(endDate, 'yyyy-MM-dd', new Date());

    return Number(String(differenceInDays(parsedEndDate, parsedStartDate)).replace('-', ''));
};
