import { IMealsData } from "../../interfaces/IMealsData";
import Loading from "../Loading/Loading";
import SelectedProducts from "./FoodProducts/SelectedProducts";
import Meal from "./Meal/Meal";
import { Container } from "./styles/styles";

interface ICaloriesTableCurrentDayProps {
  mealsData: IMealsData[] | undefined;
}

export default function MealsTable({
  mealsData,
}: ICaloriesTableCurrentDayProps) {
  if (!mealsData) return <Loading />;
  return (
    <Container>
      {mealsData.map((mealData) => (
        <Meal key={mealData.id} mealData={mealData}>
          <SelectedProducts selectedProductData={mealData.selectedProduct} />
        </Meal>
      ))}
    </Container>
  );
}
