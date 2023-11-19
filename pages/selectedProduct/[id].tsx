import { useRouter } from 'next/router';
import BarCode from '../../components/Barcode/BarCode';
import NutritionalValues from '../../components/NutritionalValues/NutritionalValues';
import { WeightForm } from '../../components/Forms/WeightForm/WeightForm';
import Loading from '../../components/Loading/Loading';
import { useEditSelectedProduct } from '../../hooks/useEditSelectedProduct';
import { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import { Secured } from 'components/security/secured';
import { Layout } from 'components/Layouts/Layout';
import { AccountType } from 'types/enum';

const SelectedProduct: NextPageWithLayout = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Head>
                <title>FitCalc | Edit Selected Product</title>
            </Head>
            <Secured authorities={[AccountType.Standard, AccountType.Admin]}>
                <SelectedProductView selectedProductId={String(id)} />
            </Secured>
        </>
    );
};

SelectedProduct.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default SelectedProduct;

interface SelectedProductViewProps {
    selectedProductId: string;
}

export function SelectedProductView({ selectedProductId }: SelectedProductViewProps) {
    const selectedProduct = useEditSelectedProduct(selectedProductId);

    if (!selectedProduct?.data) return <Loading />;
    return (
        <>
            <WeightForm
                defaultValues={{ weight: selectedProduct.data.weight }}
                kcal={selectedProduct.data.foodProduct.kcal}
                submit={(weight) => selectedProduct.edit(selectedProductId, +weight)}
            />
            <NutritionalValues productData={selectedProduct.data.foodProduct} />
            {selectedProduct.data.foodProduct.code ? <BarCode value={selectedProduct.data.foodProduct.code} /> : null}
        </>
    );
}
