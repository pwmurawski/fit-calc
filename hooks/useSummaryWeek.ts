import useSWRImmutable from 'swr/immutable';
import { useSelectedDate } from './useSelectedDate';
import { toastError } from 'lib/custom-toasts/toast-error';
import { getSummaryWeek } from '_api/summary';

export const useSummaryWeek = () => {
    const { formatDate } = useSelectedDate();
    const { data } = useSWRImmutable(`/summary/week/${formatDate}`, () => getSummaryWeek(formatDate));

    switch (data?.status) {
        case 'OK':
            return { summaryData: data.summaryData, dailyGoals: data.dailyGoals };
        case 'ERROR':
            toastError(data.error);
            break;
    }
};
