import { useContext } from "react";
import GlobalContext from "../../../../context/GlobalContext/GlobalContext";
import useDeleteSelectedProduct from "../../../../hooks/useDeleteSelectedProduct";
import { ISelectedProduct } from "../../../../interfaces/ISelectedProduct";
import {
  Container,
  FoodContainer,
  FoodMacro,
  DeleteBtn,
  Name,
  Top,
  Value,
} from "./styles/styles";

interface ISelectedProductProps {
  selectedProductData: ISelectedProduct;
}

export default function SelectedProduct({
  selectedProductData: {
    id,
    carbs,
    fat,
    kcal,
    name,
    protein,
    weight,
    mealId,
    selectedId,
    dateTime,
  },
}: ISelectedProductProps) {
  const { dispatch } = useContext(GlobalContext);
  const deleteHandler = useDeleteSelectedProduct();

  return (
    <Container
      href={`/foodProducts/${id}`}
      onClick={() => {
        dispatch({ type: "setMealId", mealId });
      }}
    >
      <Top>
        <Name>{name}</Name>
        <DeleteBtn
          onClick={(e) => {
            e.stopPropagation();
            deleteHandler(selectedId, dateTime);
          }}
        />
      </Top>
      <FoodContainer>
        <Value>
          {Number(weight.toFixed(1))} g /{" "}
          {Number(((weight * kcal) / 100).toFixed(1))} kcal
        </Value>
        <FoodMacro>
          Białka{" "}
          <Value>{Number(((weight * protein) / 100).toFixed(1))} g</Value>
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
