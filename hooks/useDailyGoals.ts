import useSWRImmutable from 'swr/immutable';
import { useSelectedDate } from './useSelectedDate';
import { toastError } from 'lib/custom-toasts/toast-error';
import { getDailyGoals, postDailyGoals } from '_api/dailyGoals';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { BodyDailyGoals } from 'types/DailyGoals';

export const useDailyGoals = (isCurrent = false) => {
    const { push } = useRouter();
    const { formatDate } = useSelectedDate();
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    const cacheKey = `/dailyGoals/${formatDate >= currentDate ? 'current' : formatDate}`;
    const { data, mutate } = useSWRImmutable(isCurrent ? `/dailyGoals/current` : cacheKey, () =>
        getDailyGoals(isCurrent ? currentDate : formatDate),
    );

    const changeDailyGoals = async (data: BodyDailyGoals) => {
        const res = await postDailyGoals(data);
        switch (res?.status) {
            case 'OK':
                await mutate();
                push('/');
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
    };

    switch (data?.status) {
        case 'OK':
            return { data: data.dailyGoals, changeDailyGoals };
        case 'ERROR':
            toastError(data.error);
            break;
    }
};
