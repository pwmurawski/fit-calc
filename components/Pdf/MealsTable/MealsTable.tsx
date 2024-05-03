import { MealsData } from '../../../types/Meal';
import Loading from '../../Loading/Loading';
import SelectedProducts from './SelectedProducts/SelectedProducts';
import Meal from './Meal/Meal';
import { Container } from './styles/styles';
import { useEffect, useRef, useState } from 'react';
import { getElementsPerPage } from 'helpers/getElementsPerPage';

interface ICaloriesTableCurrentDayProps {
    mealsData: MealsData[] | undefined;
}

export default function MealsTablePdf({ mealsData }: ICaloriesTableCurrentDayProps) {
    const [elementsPerPage, setElementsPerPage] = useState<number[]>([]);
    const elementRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const heights = elementRefs.current.map((ref) => ref?.clientHeight ?? 0);
        setElementsPerPage(getElementsPerPage(heights));
    }, []);

    if (!mealsData) return null;
    if (!mealsData) return <Loading />;
    return (
        <Container>
            {mealsData.map((mealData, index) => (
                <div
                    key={index}
                    ref={(el) => (elementRefs.current[index] = el)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
                >
                    <Meal key={mealData.id} mealData={mealData}>
                        <SelectedProducts selectedProductData={mealData.selectedProduct} />
                    </Meal>
                    {elementsPerPage.includes(index + 1) && (
                        <div style={{ display: 'block', pageBreakAfter: 'always' }} />
                    )}
                </div>
            ))}
        </Container>
    );
}
