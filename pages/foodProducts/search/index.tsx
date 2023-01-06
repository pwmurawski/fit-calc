import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AddNewFoodProduct from "../../../components/AddNewFoodProduct/AddNewFoodProduct";
import FoodProductsTable from "../../../components/FoodProductsTable/FoodProductsTable";
import getFoodProducts from "../../../_api/getFoodProducts";
import userAuth from "../../../helpers/userAuth";
import { IGetServerProps } from "../../../types/GetServerPropsTypes";
import { FoodProductType } from "../../../types/FoodProductTypes";

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

export default function Search() {
  const [foodProducts, setFoodProducts] = useState<FoodProductType[]>();
  const {
    query: { term },
  } = useRouter();

  const searchData = () => {
    if (foodProducts)
      if (typeof term === "string") {
        return foodProducts.filter(
          ({ name, code }) =>
            name.toLowerCase().includes(term.toLowerCase()) ||
            code?.toLowerCase().includes(term.toLowerCase())
        );
      }
    return undefined;
  };

  const getData = async () => {
    const res = await getFoodProducts();
    if (res?.data) setFoodProducts(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <FoodProductsTable foodProductsData={searchData()} />
      <AddNewFoodProduct />
    </>
  );
}
