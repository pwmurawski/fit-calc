import { FC } from 'react';
import { Container, LastSelectedProduct, SubmitBtn } from './styles/styles';
import { useAddSelectedProduct } from 'hooks/useAddSelectedProduct';

interface FiveLastSelectedProductsProps {
    foodProductId: string;
    lastSelectedProducts: {
        id: string;
        weight: number;
        kcal: number;
    }[];
}

export const FiveLastSelectedProducts: FC<FiveLastSelectedProductsProps> = ({
    foodProductId,
    lastSelectedProducts,
}) => {
    const addFoodProductToMeal = useAddSelectedProduct();

    const addFoodProductToMealHandle = (foodProductId: string, weight: number) => {
        addFoodProductToMeal(foodProductId, weight);
    };

    return (
        <Container>
            {lastSelectedProducts.map(({ id, weight, kcal }) => (
                <LastSelectedProduct key={id}>
                    <div>{weight} g</div>
                    <div>{weight} g</div>
                    <div>{kcal} kcal</div>
                    <SubmitBtn
                        type="submit"
                        aria-label="Submit"
                        onClick={() => addFoodProductToMealHandle(foodProductId, weight)}
                    />
                </LastSelectedProduct>
            ))}
        </Container>
    );
};
