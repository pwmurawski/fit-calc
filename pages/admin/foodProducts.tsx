import { Secured } from 'components/security/secured';
import { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { AccountType } from 'types/enum';
import { AdminFoodTable } from 'components/AdminFoodTable/AdminFoodTable';
import { AdminLayout } from 'components/Layouts/AdminLayout';

const FoodProducts: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>FitCalc | Produkty</title>
            </Head>
            <FoodProductsView />
        </>
    );
};

FoodProducts.getLayout = function getLayout(page) {
    return (
        <Secured authorities={[AccountType.Admin]}>
            <AdminLayout>{page}</AdminLayout>
        </Secured>
    );
};

export default FoodProducts;

function FoodProductsView() {
    return <AdminFoodTable />;
}
