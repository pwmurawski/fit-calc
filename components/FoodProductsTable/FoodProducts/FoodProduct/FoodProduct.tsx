import { IFoodProductData } from "../../../../types/IFoodProductData";
import {
  Container,
  FoodContainer,
  FoodMacro,
  Name,
  Top,
  Value,
  Weight,
} from "./styles/styles";

interface IFoodProductProps {
  foodProductData: IFoodProductData;
}

export default function FoodProduct({
  foodProductData: { carbs, fat, id, kcal, name, protein },
}: IFoodProductProps) {
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
      <Weight>/ 100 g</Weight>
    </Container>
  );
}
