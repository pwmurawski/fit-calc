import useDeleteSelectedProduct from '../../../../hooks/useDeleteSelectedProduct';
import { SelectedProduct } from '../../../../types/SelectedProductTypes';
import { Container, FoodContainer, FoodMacro, DeleteBtn, Name, Top, Value } from './styles/styles';

interface SelectedProductProps {
    selectedProductData: SelectedProduct;
}

export function SelectedProductView({
    selectedProductData: { id, carbs, fat, kcal, name, protein, weight, dateTime },
}: SelectedProductProps) {
    const deleteHandler = useDeleteSelectedProduct();

    return (
        <Container href={`/selectedProduct/${id}`}>
            <Top>
                <Name>{name}</Name>
                <DeleteBtn
                    onClick={(e) => {
                        e.preventDefault();
                        deleteHandler(id, dateTime);
                    }}
                />
            </Top>
            <FoodContainer>
                <Value>
                    {Number(weight.toFixed(1))} g / {Number(((weight * kcal) / 100).toFixed(1))} kcal
                </Value>
                <FoodMacro>
                    Białka <Value>{Number(((weight * protein) / 100).toFixed(1))} g</Value>
                </FoodMacro>
                <FoodMacro>
                    Tłuszcz <Value>{Number(((weight * fat) / 100).toFixed(1))} g</Value>
                </FoodMacro>
                <FoodMacro>
                    Węgl. <Value>{Number(((weight * carbs) / 100).toFixed(1))} g</Value>
                </FoodMacro>
            </FoodContainer>
        </Container>
    );
}
