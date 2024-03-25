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
import { FiveLastSelectedProducts } from 'components/FiveLastSelectedProducts/FiveLastSelectedProducts';
import { useAddSelectedProduct } from 'hooks/useAddSelectedProduct';

const FoodProduct: NextPageWithLayout = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Head>
                <title>FitCalc | Food Product</title>
            </Head>
            <FoodProductView foodProductId={String(id)} />
        </>
    );
};

FoodProduct.getLayout = function getLayout(page) {
    return (
        <Secured authorities={[AccountType.Standard]}>
            <Layout>{page}</Layout>
        </Secured>
    );
};

export default FoodProduct;

interface FoodProductPageProps {
    foodProductId: string;
}

export function FoodProductView({ foodProductId }: FoodProductPageProps) {
    const { session } = useAuth();
    const foodProduct = useFoodProduct(foodProductId);
    const addFoodProductToMeal = useAddSelectedProduct();

    if (!foodProduct) return <Loading />;
    return (
        <>
            <WeightForm
                kcal={foodProduct.kcal}
                submit={(weight) => {
                    addFoodProductToMeal(foodProductId, weight);
                }}
            />
            <FiveLastSelectedProducts
                foodProductId={foodProduct.id}
                lastSelectedProducts={foodProduct.lastSelectedProducts}
            />
            <Options
                ids={{
                    productId: foodProduct?.id,
                    productUserId: foodProduct?.userId,
                    userAuthId: session.data?.user.id,
                }}
            />
            <NutritionalValues productData={foodProduct} />
            {foodProduct.code ? <BarCode value={foodProduct.code} /> : null}
        </>
    );
}
