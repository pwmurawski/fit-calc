import { useAddSelectedProduct } from 'hooks/useAddSelectedProduct';
import { FoodProductType } from '../../../../types/FoodProduct';
import {
    Container,
    FoodContainer,
    FoodMacro,
    LastSelectedProduct,
    Name,
    PlusIcon,
    Top,
    Value,
    Weight,
} from './styles/styles';

interface IFoodProductProps {
    foodProductData: FoodProductType;
}

export default function FoodProduct({
    foodProductData: {
        id,
        name,
        kcal,
        protein,
        fat,
        carbs,
        lastSelectedProduct: { weight },
    },
}: IFoodProductProps) {
    const addFoodProductToMeal = useAddSelectedProduct();

    const addFoodProductToMealHandle = () => {
        if (weight) {
            addFoodProductToMeal(id, weight);
        }
    };

    return (
        <Container href={`/foodProducts/${id}`}>
            <Top>
                <Name>{name}</Name>
            </Top>
            <FoodContainer>
                <Value>{kcal} kcal</Value>
                <FoodMacro>
                    Białka <Value>{protein} g</Value>
                </FoodMacro>
                <FoodMacro>
                    Tłuszcz <Value>{fat} g</Value>
                </FoodMacro>
                <FoodMacro>
                    Węgl. <Value>{carbs} g</Value>
                </FoodMacro>
            </FoodContainer>
            <Weight $isLastSelectedProduct={!!weight}>
                {weight && (
                    <LastSelectedProduct
                        onClick={(e) => {
                            e.preventDefault();
                            addFoodProductToMealHandle();
                        }}
                    >
                        {weight} g
                        <PlusIcon />
                    </LastSelectedProduct>
                )}
                / 100 g
            </Weight>
        </Container>
    );
}
