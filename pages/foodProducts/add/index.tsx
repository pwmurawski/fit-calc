import Head from 'next/head';
import { FoodProductForm } from '../../../components/Forms/FoodProductForm/FoodProductForm';
import { useAddFoodProduct } from '../../../hooks/useAddFoodProduct';
import { Secured } from 'components/security/secured';
import { AccountType } from 'types/enum';
import { NextPageWithLayout } from 'pages/_app';
import { Layout } from 'components/Layouts/Layout';

const AddFoodProduct: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>FitCalc | Add Food Product</title>
            </Head>
            <AddFoodProductView />
        </>
    );
};

AddFoodProduct.getLayout = function getLayout(page) {
    return (
        <Secured authorities={[AccountType.Standard]}>
            <Layout>{page}</Layout>
        </Secured>
    );
};

export default AddFoodProduct;

export function AddFoodProductView() {
    const addFoodProduct = useAddFoodProduct();

    return <FoodProductForm submit={addFoodProduct} />;
}
