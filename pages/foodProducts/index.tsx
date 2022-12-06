import { GetStaticProps } from "next";
import AddNewFoodProduct from "../../components/AddNewFoodProduct/AddNewFoodProduct";
import FoodProductsTable from "../../components/FoodProductsTable/FoodProductsTable";
import getFoodProducts from "../../api/getFoodProducts";
import { IFoodProductData } from "../../types/IFoodProductData";
import useAuth from "../../hooks/useAuth";

export const getStaticProps: GetStaticProps = async () => {
  const response = await getFoodProducts();
  if (!response?.data)
    throw new Error(
      `Failed to fetch data, received status ${response?.status}`
    );

  return {
    props: {
      foodProducts: response.data,
    },
  };
};

export default function FoodProducts({
  foodProducts,
}: {
  foodProducts: IFoodProductData[];
}) {
  const { isUser, logoutHandler } = useAuth();
  if (!isUser) logoutHandler();

  return (
    <>
      <FoodProductsTable foodProductsData={foodProducts} />
      <AddNewFoodProduct />
    </>
  );
}
