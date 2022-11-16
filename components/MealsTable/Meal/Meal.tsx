import { ReactNode, useContext, useState } from "react";
import GlobalContext from "../../../context/GlobalContext/GlobalContext";
import { IMealData } from "../../../interfaces/IMealData";
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
  const { dispatch } = useContext(GlobalContext);
  const [showFoodProducts, setShowFoodProducts] = useState(false);

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
              dispatch({ type: "setMealId", mealId: id });
            }}
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
