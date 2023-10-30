import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import BarCode from '../../components/Barcode/BarCode';
import NutritionalValues from '../../components/NutritionalValues/NutritionalValues';
import WeightInput from '../../components/Forms/WeightForm/WeightForm';
import { FoodProductType } from '../../types/FoodProductTypes';
import useAddFoodProductToMeal from '../../hooks/useAddFoodProductToMeal';
import Loading from '../../components/Loading/Loading';
import useAuth from '../../hooks/useAuth';
import { getFoodProduct } from '_api/foodProducts';
import { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { Layout } from 'components/Layouts/Layout';
import { FoodProduct } from '@prisma/client';
import { toastError } from 'lib/custom-toasts/toast-error';

const Options = dynamic(() => import('../../components/Options/Options'), {
    ssr: false,
});

interface IParams extends ParsedUrlQuery {
    id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as IParams;
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

interface IFoodProductPageProps {
    foodProductData: FoodProductType | null;
    error: string | null;
}

export default function FoodProductView({ foodProductData, error }: IFoodProductPageProps) {
    const { session, logoutHandler } = useAuth();
    // const addFoodProductToMeal = useAddFoodProductToMeal();

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
            <WeightInput kcal={foodProductData.kcal} submit={() => {}} />
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
