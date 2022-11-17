import { GetStaticProps } from "next";
import { useEffect } from "react";
import AddNewFoodProduct from "../../components/AddNewFoodProduct/AddNewFoodProduct";
import FoodProductsTable from "../../components/FoodProductsTable/FoodProductsTable";
import getFoodProducts from "../../api/getFoodProducts";
import { IFoodProductData } from "../../interfaces/IFoodProductData";
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
  const { token, logoutHandler } = useAuth();

  useEffect(() => {
    if (!token) logoutHandler();
  }, []);

  return (
    <>
      <FoodProductsTable foodProductsData={foodProducts} />
      <AddNewFoodProduct />
    </>
  );
}
