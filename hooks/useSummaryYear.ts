import useSWRImmutable from 'swr/immutable';
import { useSelectedDate } from './useSelectedDate';
import { toastError } from 'lib/custom-toasts/toast-error';
import { getSummaryYear } from '_api/summary';

export const useSummaryYear = () => {
    const { formatDate } = useSelectedDate();
    const { data } = useSWRImmutable(`/summary/year/${formatDate}`, () => getSummaryYear(formatDate));

    switch (data?.status) {
        case 'OK':
            return { summaryData: data.summaryData, dailyGoals: data.dailyGoals };
        case 'ERROR':
            toastError(data.error);
            break;
    }
};
