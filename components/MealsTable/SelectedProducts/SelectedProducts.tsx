import uuid from "react-uuid";
import { ISelectedProduct } from "../../../types/SelectedProductTypes";
import SelectedProduct from "./SelectedProduct/SelectedProduct";

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
