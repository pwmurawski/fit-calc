import useSWRImmutable from 'swr/immutable';
import { toastError } from 'lib/custom-toasts/toast-error';
import { getSummaryByDateRange } from '_api/summary';

export const useSummaryByDateRange = (start: string, end: string) => {
    const { data } = useSWRImmutable(`/summary/byDateRange/${start}/${end}`, () => getSummaryByDateRange(start, end));

    switch (data?.status) {
        case 'OK':
            return { summaryData: data.summaryData, dailyGoals: data.dailyGoals };
        case 'ERROR':
            toastError(data.error);
            break;
    }
};
