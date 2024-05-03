import { useEffect, useRef, useState } from 'react';
import { SelectedProductType } from '../../../../types/SelectedProduct';
import { SelectedProductView } from './SelectedProduct/SelectedProduct';
import { getElementsPerPage } from 'helpers/getElementsPerPage';

interface FoodProductsProps {
    selectedProductData: SelectedProductType[];
}

export default function SelectedProducts({ selectedProductData }: FoodProductsProps) {
    const [elementsPerPage, setElementsPerPage] = useState<number[]>([]);
    const elementRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const heights = elementRefs.current.map((ref) => ref?.clientHeight ?? 0);
        setElementsPerPage(getElementsPerPage(heights));
    }, []);

    return (
        <>
            {selectedProductData.map((selectedProduct, index) => (
                <div
                    key={index}
                    ref={(el) => (elementRefs.current[index] = el)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
                >
                    <SelectedProductView key={selectedProduct.id} selectedProductData={selectedProduct} />
                    {elementsPerPage.includes(index + 1) && (
                        <div style={{ display: 'block', pageBreakAfter: 'always' }} />
                    )}
                </div>
            ))}
        </>
    );
}
