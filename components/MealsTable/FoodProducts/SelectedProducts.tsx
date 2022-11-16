import uuid from "react-uuid";
import { ISelectedProduct } from "../../../interfaces/ISelectedProduct";
import SelectedProduct from "./FoodProduct/SelectedProduct";

interface IFoodProductsProps {
  selectedProductData: ISelectedProduct[];
}

export default function SelectedProducts({
  selectedProductData,
}: IFoodProductsProps) {
  return (
    <>
      {selectedProductData.map((selectedProduct) => (
        <SelectedProduct key={uuid()} selectedProductData={selectedProduct} />
      ))}
    </>
  );
}
