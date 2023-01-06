import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import getFoodProduct from "../../_api/getFoodProduct";
import BarCode from "../../components/Barcode/BarCode";
import NutritionalValues from "../../components/NutritionalValues/NutritionalValues";
import WeightInput from "../../components/Forms/WeightForm/WeightForm";
import { FoodProductType } from "../../types/FoodProductTypes";
import useAddFoodProductToMeal from "../../hooks/useAddFoodProductToMeal";
import getFoodProducts from "../../_api/getFoodProducts";
import Loading from "../../components/Loading/Loading";
import useAuth from "../../hooks/useAuth";

const Options = dynamic(() => import("../../components/Options/Options"), {
  ssr: false,
});

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getFoodProducts();
  if (!response?.data)
    throw new Error(
      `Failed to fetch data, received status ${response?.status}`
    );

  const paths = response.data.map(({ id }) => ({ params: { id } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as IParams;
  const response = await getFoodProduct(id);
  if (!response?.data)
    throw new Error(
      `Failed to fetch data, received status ${response?.status}`
    );

  return {
    props: {
      foodProductData: response.data,
    },
  };
};

interface IFoodProductPageProps {
  foodProductData: FoodProductType | undefined;
}

export default function FoodProductPage({
  foodProductData,
}: IFoodProductPageProps) {
  const { isUser, logoutHandler } = useAuth();
  const addFoodProductToMeal = useAddFoodProductToMeal();

  useEffect(() => {
    if (!isUser) logoutHandler(false);
  }, []);

  if (!foodProductData) return <Loading />;
  return (
    <>
      <WeightInput
        kcal={foodProductData.kcal}
        submit={(weight) => addFoodProductToMeal(foodProductData.id, +weight)}
      />
      <Options
        ids={{
          productId: foodProductData.id,
          productUserId: foodProductData.userId,
          userAuthId: isUser,
        }}
      />
      <NutritionalValues productData={foodProductData} />
      {foodProductData.code ? <BarCode value={foodProductData.code} /> : null}
    </>
  );
}
