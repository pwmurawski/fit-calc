import { IFoodProductData } from "../../interfaces/IFoodProductData";
import Loading from "../Loading/Loading";
import FoodProducts from "./FoodProducts/FoodProducts";
import { Container } from "./styles/styles";

interface IFoodProductsTableProps {
  foodProductsData: IFoodProductData[] | undefined;
}

export default function FoodProductsTable({
  foodProductsData,
}: IFoodProductsTableProps) {
  if (!foodProductsData) return <Loading />;
  return (
    <Container>
      <FoodProducts foodProductsData={foodProductsData} />
    </Container>
  );
}
