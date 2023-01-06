import { FoodProductType } from "../../../types/FoodProductTypes";
import FoodProduct from "./FoodProduct/FoodProduct";

interface IFoodProductsProps {
  foodProductsData: FoodProductType[];
}

export default function FoodProducts({ foodProductsData }: IFoodProductsProps) {
  return (
    <>
      {foodProductsData.map((foodProductData) => (
        <FoodProduct
          key={foodProductData.id}
          foodProductData={foodProductData}
        />
      ))}
    </>
  );
}
