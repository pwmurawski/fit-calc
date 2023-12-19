import useSWRImmutable from 'swr/immutable';
import { useSelectedDate } from './useSelectedDate';
import { toastError } from 'lib/custom-toasts/toast-error';
import { getSummaryMonth } from '_api/summary';

export const useSummaryMonth = () => {
    const { formatDate } = useSelectedDate();
    const { data } = useSWRImmutable(`/summary/month/${formatDate}`, () => getSummaryMonth(formatDate));

    switch (data?.status) {
        case 'OK':
            return { summaryData: data.summaryData, dailyGoals: data.dailyGoals };
        case 'ERROR':
            toastError(data.error);
            break;
    }
};
