import { MealsData } from '../../types/MealTypes';
import Loading from '../Loading/Loading';
import SelectedProducts from './SelectedProducts/SelectedProducts';
import Meal from './Meal/Meal';
import { Container } from './styles/styles';
import useLoading from '../../hooks/useLoading';

interface ICaloriesTableCurrentDayProps {
    mealsData: MealsData[] | undefined;
}

export default function MealsTable({ mealsData }: ICaloriesTableCurrentDayProps) {
    const { isLoading } = useLoading();

    if (isLoading && !mealsData) return null;
    if (!mealsData) return <Loading />;
    return (
        <Container>
            {mealsData.map((mealData) => (
                <Meal key={mealData.id} mealData={mealData}>
                    <SelectedProducts selectedProductData={mealData.selectedProduct} />
                </Meal>
            ))}
        </Container>
    );
}
