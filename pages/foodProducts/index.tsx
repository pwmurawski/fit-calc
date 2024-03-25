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
            <FoodProductsView />
        </>
    );
};

FoodProducts.getLayout = function getLayout(page) {
    return (
        <Secured authorities={[AccountType.Standard]}>
            <Layout>{page}</Layout>
        </Secured>
    );
};

export default FoodProducts;

export function FoodProductsView() {
    const { data, ...pagination } = useFoodProducts();

    return (
        <>
            <FoodProductsTable foodProductsData={data} pagination={pagination} />
            <AddNewFoodProduct />
        </>
    );
}
