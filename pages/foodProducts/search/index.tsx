import { useRouter } from 'next/router';
import AddNewFoodProduct from '../../../components/AddNewFoodProduct/AddNewFoodProduct';
import FoodProductsTable from '../../../components/FoodProductsTable/FoodProductsTable';
import { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { Secured } from 'components/security/secured';
import { AccountType } from 'types/enum';
import { Layout } from 'components/Layouts/Layout';
import { useSearchFoodProducts } from 'hooks/useSearchFoodProducts';

const Search: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>FitCalc | Food Products</title>
            </Head>
            <SearchView />
        </>
    );
};

Search.getLayout = function getLayout(page) {
    return (
        <Secured authorities={[AccountType.Standard]}>
            <Layout>{page}</Layout>
        </Secured>
    );
};

export default Search;

export function SearchView() {
    const {
        query: { term },
    } = useRouter();
    const foodProducts = useSearchFoodProducts(String(term));

    return (
        <>
            <FoodProductsTable foodProductsData={foodProducts} />
            <AddNewFoodProduct />
        </>
    );
}
