import { Container, Name, NutritionalVal, Kcal, Macro, Weight } from './styles/styles';

interface INutritionalValuesProps {
    productData: {
        name: string;
        kcal: number;
        protein: number;
        fat: number;
        carbs: number;
    };
}

export default function NutritionalValues({
    productData: { carbs, fat, kcal, name, protein },
}: INutritionalValuesProps) {
    return (
        <Container>
            <Name>{name}</Name>
            <NutritionalVal>
                <Kcal>{kcal} kcal</Kcal>
                <Macro>
                    Białko <span>{protein} g</span>
                </Macro>
                <Macro>
                    Tłuszcz <span>{fat} g</span>
                </Macro>
                <Macro>
                    Węglowodany <span>{carbs} g</span>
                </Macro>
                <Weight>/ 100 g</Weight>
            </NutritionalVal>
        </Container>
    );
}
