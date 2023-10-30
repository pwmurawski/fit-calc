import Head from 'next/head';
import FoodProductForm from '../../../components/Forms/FoodProductForm/FoodProductForm';
import useAddFoodProduct from '../../../hooks/useAddFoodProduct';
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
            <Secured authorities={[AccountType.Standard, AccountType.Admin]}>
                <AddFoodProductView />
            </Secured>
        </>
    );
};

AddFoodProduct.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default AddFoodProduct;

export function AddFoodProductView() {
    const addFoodProduct = useAddFoodProduct();

    return <FoodProductForm submit={addFoodProduct} />;
}
