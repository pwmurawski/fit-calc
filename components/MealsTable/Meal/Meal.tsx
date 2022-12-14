import { ReactNode, useState } from "react";
import useMealId from "../../../hooks/useMealId";
import { IMealData } from "../../../types/MealsDataTypes";
import {
  Container,
  Name,
  Top,
  Bottom,
  Kcal,
  Macro,
  Value,
  AddLink,
} from "./styles/styles";

interface IMealProps {
  mealData: IMealData;
  children: ReactNode;
}

export default function Meal({
  mealData: { carbs, fat, id, kcal, name, protein },
  children,
}: IMealProps) {
  const [showFoodProducts, setShowFoodProducts] = useState(false);
  const { setMealId } = useMealId();

  return (
    <>
      <Container
        onClick={() => {
          setShowFoodProducts(!showFoodProducts);
        }}
      >
        <Top>
          <Name>{name}</Name>
          <Kcal>
            <Value>{Number(kcal.toFixed(1))} kcal</Value>
          </Kcal>
          <AddLink
            href="/foodProducts"
            onClick={(e) => {
              e.stopPropagation();
              setMealId(id);
            }}
            aria-label="Open food product list"
          />
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
      {showFoodProducts ? children : null}
    </>
  );
}
