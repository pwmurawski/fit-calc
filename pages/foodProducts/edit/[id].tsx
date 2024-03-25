import { NextPageWithLayout } from 'pages/_app';
import { FoodProductForm } from '../../../components/Forms/FoodProductForm/FoodProductForm';
import Loading from '../../../components/Loading/Loading';
import useEditFoodProduct from '../../../hooks/useEditFoodProduct';
import Head from 'next/head';
import { Secured } from 'components/security/secured';
import { AccountType } from 'types/enum';
import { Layout } from 'components/Layouts/Layout';
import { useRouter } from 'next/router';

const EditFoodProduct: NextPageWithLayout = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Head>
                <title>FitCalc | Edit Food Product</title>
            </Head>
            <EditFoodProductView foodProductId={String(id)} />
        </>
    );
};

EditFoodProduct.getLayout = function getLayout(page) {
    return (
        <Secured authorities={[AccountType.Standard]}>
            <Layout>{page}</Layout>
        </Secured>
    );
};

export default EditFoodProduct;

interface EditFoodProductViewProps {
    foodProductId: string;
}

export function EditFoodProductView({ foodProductId }: EditFoodProductViewProps) {
    const editFoodProduct = useEditFoodProduct(foodProductId);

    if (!editFoodProduct?.defaultValue) return <Loading stopClick />;
    return <FoodProductForm submit={editFoodProduct.edit} defaultValue={editFoodProduct.defaultValue} />;
}
