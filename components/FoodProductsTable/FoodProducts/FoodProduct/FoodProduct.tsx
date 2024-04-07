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
    Verified,
    Weight,
} from './styles/styles';
import { VerifiedSvg } from 'components/Svg/VerifiedSvg';

interface IFoodProductProps {
    foodProductData: FoodProductType;
}

export default function FoodProduct({
    foodProductData: { id, name, kcal, protein, fat, carbs, verifiedFoodProduct, lastSelectedProductWeight },
}: IFoodProductProps) {
    const addFoodProductToMeal = useAddSelectedProduct();

    console.log(verifiedFoodProduct);

    const addFoodProductToMealHandle = () => {
        if (lastSelectedProductWeight) {
            addFoodProductToMeal(id, lastSelectedProductWeight);
        }
    };

    return (
        <Container href={`/foodProducts/${id}`}>
            {verifiedFoodProduct && (
                <Verified>
                    <VerifiedSvg />
                </Verified>
            )}
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
            <Weight $isLastSelectedProduct={!!lastSelectedProductWeight}>
                {lastSelectedProductWeight && (
                    <LastSelectedProduct
                        onClick={(e) => {
                            e.preventDefault();
                            addFoodProductToMealHandle();
                        }}
                    >
                        {lastSelectedProductWeight} g
                        <PlusIcon />
                    </LastSelectedProduct>
                )}
                / 100 g
            </Weight>
        </Container>
    );
}
