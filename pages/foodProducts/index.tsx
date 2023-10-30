import AddNewFoodProduct from '../../components/AddNewFoodProduct/AddNewFoodProduct';
import FoodProductsTable from '../../components/FoodProductsTable/FoodProductsTable';
import { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { Secured } from 'components/security/secured';
import { Layout } from 'components/Layouts/Layout';
import { AccountType } from 'types/enum';
import { useFoodProducts } from 'hooks/useFoodProducts';

const FoodProducts: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>FitCalc | Food Products</title>
            </Head>
            <Secured authorities={[AccountType.Standard, AccountType.Admin]}>
                <FoodProductsView />
            </Secured>
        </>
    );
};

FoodProducts.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default FoodProducts;

export function FoodProductsView() {
    const foodProducts = useFoodProducts();

    return (
        <>
            <FoodProductsTable foodProductsData={foodProducts} />
            <AddNewFoodProduct />
        </>
    );
}
