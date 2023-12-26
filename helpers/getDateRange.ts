import {
    startOfWeek,
    endOfWeek,
    addWeeks,
    subWeeks,
    addDays,
    subDays,
    startOfDay,
    endOfDay,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    addYears,
    subYears,
    startOfYear,
    endOfYear,
} from 'date-fns';

export enum Ranges {
    Day,
    Week,
    Month,
    Year,
}

export const getDateRange = (range: Ranges) => {
    switch (range) {
        case Ranges.Day:
            return { add: addDays, sub: subDays, start: startOfDay, end: endOfDay };
        case Ranges.Week:
            return { add: addWeeks, sub: subWeeks, start: startOfWeek, end: endOfWeek };
        case Ranges.Month:
            return { add: addMonths, sub: subMonths, start: startOfMonth, end: endOfMonth };
        case Ranges.Year:
            return { add: addYears, sub: subYears, start: startOfYear, end: endOfYear };
    }
};
