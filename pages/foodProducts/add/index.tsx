import FoodProductForm from "../../../components/Forms/FoodProductForm/FoodProductForm";
import useAddFoodProduct from "../../../hooks/useAddFoodProduct";
import userAuth from "../../../helpers/userAuth";
import { IGetServerProps } from "../../../types/GetServerPropsTypes";

export default function Add() {
  const addFoodProduct = useAddFoodProduct();

  return <FoodProductForm submit={addFoodProduct} />;
}
