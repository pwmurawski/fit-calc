import { IFoodProductData } from "../../types/IFoodProductData";
import {
  Container,
  Name,
  NutritionalVal,
  Kcal,
  Macro,
  Weight,
} from "./styles/styles";

interface INutritionalValuesProps {
  foodProductData: IFoodProductData;
}

export default function NutritionalValues({
  foodProductData: { carbs, fat, kcal, name, protein },
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
