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
            <Secured authorities={[AccountType.Standard, AccountType.Admin]}>
                <EditFoodProductView foodProductId={String(id)} />
            </Secured>
        </>
    );
};

EditFoodProduct.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default EditFoodProduct;

interface EditFoodProductViewProps {
    foodProductId: string;
}

export function EditFoodProductView({ foodProductId }: EditFoodProductViewProps) {
    const { editFoodProduct, defaultValue } = useEditFoodProduct(foodProductId);

    if (!defaultValue) return <Loading stopClick />;
    return <FoodProductForm submit={editFoodProduct} defaultValue={defaultValue} />;
}
