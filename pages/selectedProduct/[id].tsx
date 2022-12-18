import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import BarCode from "../../components/Barcode/BarCode";
import NutritionalValues from "../../components/NutritionalValues/NutritionalValues";
import WeightInput from "../../components/Forms/WeightForm/WeightForm";
import Loading from "../../components/Loading/Loading";
import userAuth from "../../helpers/userAuth";
import { IGetServerProps } from "../../types/GetServerPropsTypes";
import useEditSelectedProduct from "../../hooks/useEditSelectedProduct";

interface IQuery extends ParsedUrlQuery {
  id: string;
}

export default function SelectedProductPage() {
  const { query } = useRouter();
  const { id } = query as IQuery;
  const { selectedProductData, editSelectedProduct } =
    useEditSelectedProduct(id);

  if (!selectedProductData) return <Loading />;
  return (
    <>
      <WeightInput
        kcal={selectedProductData.foodProduct.kcal}
        submit={(weight) =>
          editSelectedProduct(selectedProductData.id, +weight)
        }
      />
      <NutritionalValues productData={selectedProductData.foodProduct} />
      {selectedProductData.foodProduct.code ? (
        <BarCode value={selectedProductData.foodProduct.code} />
      ) : null}
    </>
  );
}
