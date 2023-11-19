import BarCode from '../../components/Barcode/BarCode';
import NutritionalValues from '../../components/NutritionalValues/NutritionalValues';
import { WeightForm } from '../../components/Forms/WeightForm/WeightForm';
import { useFoodProduct } from '../../hooks/useFoodProduct';
import Loading from '../../components/Loading/Loading';
import { Layout } from 'components/Layouts/Layout';
import Options from 'components/Options/Options';
import { NextPageWithLayout } from 'pages/_app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Secured } from 'components/security/secured';
import { AccountType } from 'types/enum';
import { useAuth } from 'hooks/useAuth';

const FoodProduct: NextPageWithLayout = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Head>
                <title>FitCalc | Food Product</title>
            </Head>
            <Secured authorities={[AccountType.Standard, AccountType.Admin]}>
                <FoodProductView foodProductId={String(id)} />
            </Secured>
        </>
    );
};

FoodProduct.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default FoodProduct;

interface FoodProductPageProps {
    foodProductId: string;
}

export function FoodProductView({ foodProductId }: FoodProductPageProps) {
    const { session } = useAuth();
    const foodProduct = useFoodProduct(foodProductId);

    if (!foodProduct?.data) return <Loading />;
    return (
        <>
            <WeightForm
                kcal={foodProduct.data.kcal}
                submit={(weight) => {
                    foodProduct.addFoodProductToMeal(foodProductId, weight);
                }}
            />
            <Options
                ids={{
                    productId: foodProduct?.data.id,
                    productUserId: foodProduct?.data.userId,
                    userAuthId: session.data?.user.id,
                }}
            />
            <NutritionalValues productData={foodProduct?.data} />
            {foodProduct?.data.code ? <BarCode value={foodProduct?.data.code} /> : null}
        </>
    );
}
