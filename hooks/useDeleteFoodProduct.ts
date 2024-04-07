import { useLoading } from './useLoading';
import { toastError } from 'lib/custom-toasts/toast-error';
import { deleteFoodProduct } from '_api/foodProducts';
import { toastSucces } from 'lib/custom-toasts/toast-succes';
import { useRouter } from 'next/router';

export const useDeleteFoodProduct = () => {
    const { push } = useRouter();
    const { setLoading } = useLoading();

    const deleteHandler = async (foodProductId: string) => {
        setLoading(true);
        const res = await deleteFoodProduct(foodProductId);

        switch (res?.status) {
            case 'OK':
                await push('/foodProducts');
                toastSucces('Produkt został usunięty!');
                break;
            case 'ERROR':
                toastError(res.error);
                break;
        }
        setLoading(false);
    };

    return deleteHandler;
};
