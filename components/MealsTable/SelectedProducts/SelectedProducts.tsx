import { SelectedProduct } from '../../../types/SelectedProductTypes';
import { SelectedProductView } from './SelectedProduct/SelectedProduct';

interface FoodProductsProps {
    selectedProductData: SelectedProduct[];
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
