import useSWRImmutable from 'swr/immutable';
import { useSelectedDate } from './useSelectedDate';
import { toastError } from 'lib/custom-toasts/toast-error';
import { getDailyGoals, postDailyGoals } from '_api/dailyGoals';
import { useRouter } from 'next/router';
import { BodyDailyGoals } from 'types/DailyGoals';
import { useLoading } from './useLoading';
import { format } from 'date-fns';

export const useDailyGoals = (isCurrent = false) => {
    const { push } = useRouter();
    const { setLoading } = useLoading();
    const { formatDate, date } = useSelectedDate();
    const currentDate = new Date();
    const currentFormatDate = format(currentDate, 'yyyy-MM-dd');
    const cacheKey = `/dailyGoals/${formatDate >= currentFormatDate ? 'current' : formatDate}`;
    const { data, mutate } = useSWRImmutable(isCurrent ? `/dailyGoals/current` : cacheKey, () =>
        getDailyGoals(isCurrent ? currentDate : date),
    );

    const changeDailyGoals = async (data: BodyDailyGoals) => {
        setLoading(true);
        const res = await postDailyGoals(currentDate, data);
        switch (res?.status) {
            case 'OK':
                await mutate();
                push('/');
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
        setLoading(false);
    };

    switch (data?.status) {
        case 'OK':
            return { data: data.dailyGoals, changeDailyGoals };
        case 'ERROR':
            toastError(data.error);
            break;
    }
};
