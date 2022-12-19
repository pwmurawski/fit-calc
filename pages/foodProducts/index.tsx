import { GetStaticProps } from "next";
import { useEffect } from "react";
import AddNewFoodProduct from "../../components/AddNewFoodProduct/AddNewFoodProduct";
import FoodProductsTable from "../../components/FoodProductsTable/FoodProductsTable";
import getFoodProducts from "../../_api/getFoodProducts";
import { IFoodProductData } from "../../types/IFoodProductDataTypes";
import useAuth from "../../hooks/useAuth";

// export const getStaticProps: GetStaticProps = async () => {
//   const response = await getFoodProducts();
//   if (!response?.data)
//     throw new Error(
//       `Failed to fetch data, received status ${response?.status}`
//     );

//   return {
//     props: {
//       foodProducts: response.data,
//     },
//   };
// };

export default function FoodProducts({
  foodProducts,
}: {
  foodProducts: IFoodProductData[];
}) {
  const { isUser, logoutHandler } = useAuth();

  useEffect(() => {
    if (!isUser) logoutHandler(false);
  }, []);

  return (
    <>
      <FoodProductsTable foodProductsData={foodProducts} />
      <AddNewFoodProduct />
    </>
  );
}
