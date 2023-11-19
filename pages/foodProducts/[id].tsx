import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import BarCode from '../../components/Barcode/BarCode';
import NutritionalValues from '../../components/NutritionalValues/NutritionalValues';
import { WeightForm } from '../../components/Forms/WeightForm/WeightForm';
import { FoodProductType } from '../../types/FoodProductTypes';
import { useAddFoodProductToMeal } from '../../hooks/useAddFoodProductToMeal';
import Loading from '../../components/Loading/Loading';
import { useAuth } from '../../hooks/useAuth';
import { getFoodProduct } from '_api/foodProducts';
import { Layout } from 'components/Layouts/Layout';
import { toastError } from 'lib/custom-toasts/toast-error';

const Options = dynamic(() => import('../../components/Options/Options'), {
    ssr: false,
});

interface Params extends ParsedUrlQuery {
    id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as Params;
    const response = await getFoodProduct(id);

    if (response?.status === 'OK') {
        return {
            props: {
                foodProductData: response.foodProduct,
            },
        };
    }

    if (response?.status === 'ERROR') {
        return {
            props: {
                error: response.error,
            },
        };
    }

    return {
        props: {
            foodProductData: null,
        },
    };
};

FoodProductView.getLayout = function getLayout(page: JSX.Element) {
    return <Layout>{page}</Layout>;
};

interface FoodProductPageProps {
    foodProductData: FoodProductType | null;
    error: string | null;
}

export default function FoodProductView({ foodProductData, error }: FoodProductPageProps) {
    const { session, logoutHandler } = useAuth();
    const addFoodProductToMeal = useAddFoodProductToMeal();

    useEffect(() => {
        if (error) {
            toastError(error);
        }
        if (session.status === 'unauthenticated') {
            logoutHandler();
        }
    }, []);

    if (!foodProductData) return <Loading />;
    return (
        <>
            <WeightForm
                kcal={foodProductData.kcal}
                submit={(weight) => {
                    addFoodProductToMeal(foodProductData.id, weight);
                }}
            />
            <Options
                ids={{
                    productId: foodProductData.id,
                    productUserId: foodProductData.userId,
                    userAuthId: session.data?.user.id,
                }}
            />
            <NutritionalValues productData={foodProductData} />
            {foodProductData.code ? <BarCode value={foodProductData.code} /> : null}
        </>
    );
}
