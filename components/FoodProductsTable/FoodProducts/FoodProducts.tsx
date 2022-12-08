import { IFoodProductData } from "../../../types/IFoodProductDataTypes";
import FoodProduct from "./FoodProduct/FoodProduct";

interface IFoodProductsProps {
  foodProductsData: IFoodProductData[];
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
