import useSWRImmutable from "swr/immutable";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useSWRConfig } from "swr";
import { useContext } from "react";
import BarCode from "../../components/Barcode/BarCode";
import NutritionalValues from "../../components/NutritionalValues/NutritionalValues";
import WeightInput from "../../components/Forms/WeightForm/WeightForm";
import Loading from "../../components/Loading/Loading";
import userAuth from "../../helpers/userAuth";
import { IGetServerProps } from "../../types/GetServerPropsTypes";
import getSelectedProduct from "../../api/getSelectedProduct";
import putSelectedProduct from "../../api/putSelectedProduct";
import getSelectedProductDay from "../../api/getSelectedProductDay";
import GlobalContext from "../../context/GlobalContext";

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

interface IQuery extends ParsedUrlQuery {
  id: string;
}

export default function SelectedProductPage() {
  const { query, back } = useRouter();
  const { id } = query as IQuery;
  const { state } = useContext(GlobalContext);
  const { mutate } = useSWRConfig();
  const { data } = useSWRImmutable(`/selectedProduct/${id}`, () =>
    getSelectedProduct(id)
  );
  const selectedProductData = data?.data;
  const foodProduct = selectedProductData?.foodProduct;

  const editSelectedProduct = async (
    selectedProductId: string,
    weight: number
  ) => {
    const res = await putSelectedProduct(selectedProductId, weight);

    if (res?.status === 204) {
      mutate(
        `/selectedProduct/day/${state.date.toLocaleDateString()}`,
        getSelectedProductDay(state.date?.toLocaleDateString())
      );
      back();
    }
  };

  if (!(selectedProductData && foodProduct)) return <Loading />;
  return (
    <>
      <WeightInput
        kcal={foodProduct.kcal}
        submit={(weight) =>
          editSelectedProduct(selectedProductData.id, +weight)
        }
      />
      <NutritionalValues productData={foodProduct} />
      {foodProduct.code ? <BarCode value={foodProduct.code} /> : null}
    </>
  );
}
