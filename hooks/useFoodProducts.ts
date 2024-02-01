import { SWRInfiniteKeyLoader } from 'swr/infinite';
import useSWRInfinite from 'swr/infinite';
import { toastError } from 'lib/custom-toasts/toast-error';
import { getFoodProducts } from '_api/foodProducts';
import { FOOD_PRODUCTS_PAGE_SIZE } from 'lib/api/constants';

const getKey: SWRInfiniteKeyLoader = (page, previousPageData) => {
    page = page + 1;
    if (previousPageData && !previousPageData.length) return null;
    return `/foodProducts?page=${page}`;
};

export const useFoodProducts = () => {
    const { data, size, setSize } = useSWRInfinite(
        getKey,
        async (key) => {
            const searchParams = new URLSearchParams(String(key).split('?')[1]);
            const res = await getFoodProducts(Number(searchParams.get('page')));

            switch (res?.status) {
                case 'OK':
                    return res.foodProducts;
                case 'ERROR':
                    toastError(res.error);
                    break;
            }
            return [];
        },
        {
            revalidateAll: true,
        },
    );
    const isReachedEnd = data && data[data.length - 1]?.length < FOOD_PRODUCTS_PAGE_SIZE;
    const loadingMore = data && typeof data[size - 1] === 'undefined';

    return { data: data?.flat(), isReachedEnd, loadingMore, size, setSize };
};
