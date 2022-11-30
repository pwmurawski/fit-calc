import FoodProductForm from "../../../components/Forms/FoodProductForm/FoodProductForm";
import useAddFoodProduct from "../../../hooks/useAddFoodProduct";
import userAuth from "../../../helpers/userAuth";
import { IGetServerProps } from "../../../interfaces/IGetServerProps";

export const getServerSideProps = async ({ req, res }: IGetServerProps) => {
  const { isUser } = userAuth(req, res);
  if (!isUser)
    return {
      redirect: {
        destination: "/login",
      },
    };

  return { props: {} };
};

export default function Add() {
  const addFoodProduct = useAddFoodProduct();

  return <FoodProductForm submit={addFoodProduct} />;
}
