import useSWRImmutable from 'swr/immutable';
import { getDayData } from '../_api/dayData';
import { useSelectedDate } from './useSelectedDate';
import { toastError } from 'lib/custom-toasts/toast-error';

export const useDayData = () => {
    const { formatDate } = useSelectedDate();
    const { data } = useSWRImmutable(`/dayData/${formatDate}`, () => getDayData(formatDate));

    switch (data?.status) {
        case 'OK':
            return {
                mealsData: data.mealsData,
                summaryData: data.summaryData,
            };
        case 'ERROR':
            toastError(data.error);
            break;

        default:
            break;
    }
};
