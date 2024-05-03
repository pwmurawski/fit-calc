import { ReactNode } from 'react';
import { MealData } from '../../../../types/Meal';
import { Container, Name, Top, Bottom, Kcal, Macro, Value } from './styles/styles';

interface IMealProps {
    mealData: MealData;
    children: ReactNode;
}

export default function Meal({ mealData: { carbs, fat, kcal, name, protein }, children }: IMealProps) {
    return (
        <>
            <Container>
                <Top>
                    <Name>{name}</Name>
                    <Kcal>
                        <Value>{Number(kcal.toFixed(1))} kcal</Value>
                    </Kcal>
                </Top>
                <Bottom>
                    <Macro>
                        Białka <Value>{Number(protein.toFixed(1))} g</Value>
                    </Macro>
                    <Macro>
                        Tłuszcz <Value>{Number(fat.toFixed(1))} g</Value>
                    </Macro>
                    <Macro>
                        Węgl. <Value>{Number(carbs.toFixed(1))} g</Value>
                    </Macro>
                </Bottom>
            </Container>
            {children}
        </>
    );
}
