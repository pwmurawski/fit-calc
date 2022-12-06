import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import getFoodProduct from "../../api/getFoodProduct";
import BarCode from "../../components/Barcode/BarCode";
import NutritionalValues from "../../components/NutritionalValues/NutritionalValues";
import WeightInput from "../../components/Forms/WeightForm/WeightForm";
import { IFoodProductData } from "../../types/IFoodProductData";
import useAddFoodProductToMeal from "../../hooks/useAddFoodProductToMeal";
import getFoodProducts from "../../api/getFoodProducts";
import Loading from "../../components/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import Options from "../../components/Options/Options";

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
  foodProductData: IFoodProductData | undefined;
}

export default function FoodProductPage({
  foodProductData,
}: IFoodProductPageProps) {
  const { isUser, logoutHandler } = useAuth();
  if (!isUser) logoutHandler();
  const addFoodProductToMeal = useAddFoodProductToMeal();

  if (!foodProductData) return <Loading />;
  return (
    <>
      <WeightInput
        kcal={foodProductData.kcal}
        submit={(weight) => addFoodProductToMeal(foodProductData.id, weight)}
      />
      <Options
        ids={{
          foodProductId: foodProductData.id,
          foodProductUserId: foodProductData.userId,
          userAuthId: isUser,
        }}
      />
      <NutritionalValues foodProductData={foodProductData} />
      {foodProductData.code ? <BarCode value={foodProductData.code} /> : null}
    </>
  );
}
