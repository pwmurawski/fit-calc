import useSWRImmutable from 'swr/immutable';
import { useSelectedDate } from './useSelectedDate';
import { toastError } from 'lib/custom-toasts/toast-error';
import { getSummaryDay } from '_api/summary';

export const useSummaryDay = () => {
    const { formatDate } = useSelectedDate();
    const { data } = useSWRImmutable(`/summary/day/${formatDate}`, () => getSummaryDay(formatDate));

    switch (data?.status) {
        case 'OK':
            return { summaryData: data.summaryData, dailyGoals: data.dailyGoals };
        case 'ERROR':
            toastError(data.error);
            break;
    }
};
