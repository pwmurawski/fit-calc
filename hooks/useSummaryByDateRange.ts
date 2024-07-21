import useSWRImmutable from 'swr/immutable';
import { toastError } from 'lib/custom-toasts/toast-error';
import { getSummaryByDateRange } from '_api/summary';

export const useSummaryByDateRange = (start: Date, end: Date) => {
    const { data } = useSWRImmutable(`/summary/${start}/${end}`, () => getSummaryByDateRange(start, end));
    switch (data?.status) {
        case 'OK':
            return { summaryData: data.summaryData, dailyGoals: data.dailyGoals, daysData: data.daysData };
        case 'ERROR':
            toastError(data.error);
            break;
    }
};
