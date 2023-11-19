import { SelectedProductType } from '../../../types/SelectedProduct';
import { SelectedProductView } from './SelectedProduct/SelectedProduct';

interface FoodProductsProps {
    selectedProductData: SelectedProductType[];
}

export default function SelectedProducts({ selectedProductData }: FoodProductsProps) {
    return (
        <>
            {selectedProductData.map((selectedProduct) => (
                <SelectedProductView key={selectedProduct.id} selectedProductData={selectedProduct} />
            ))}
        </>
    );
}
