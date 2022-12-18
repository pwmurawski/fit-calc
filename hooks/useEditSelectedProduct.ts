import useSWRImmutable from "swr/immutable";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { format } from "date-fns";
import getSelectedProduct from "../api/getSelectedProduct";
import getSelectedProductDay from "../api/getSelectedProductDay";
import putSelectedProduct from "../api/putSelectedProduct";
import useLoading from "./useLoading";
import useDate from "./useDate";

const useEditSelectedProduct = (id: string) => {
  const { data } = useSWRImmutable(`/selectedProduct/${id}`, () =>
    getSelectedProduct(id)
  );
  const { mutate } = useSWRConfig();
  const { setLoading } = useLoading();
  const { back } = useRouter();
  const { date } = useDate();
  const formatDate = format(date, "yyyy-MM-dd");

  const editSelectedProduct = async (
    selectedProductId: string,
    weight: number
  ) => {
    setLoading(true);
    const res = await putSelectedProduct(selectedProductId, weight);

    if (res?.status === 204) {
      mutate(
        `/selectedProduct/day/${formatDate}`,
        getSelectedProductDay(formatDate)
      );
      back();
    }
    setLoading(false);
  };

  return {
    selectedProductData: data?.data,
    editSelectedProduct,
  };
};

export default useEditSelectedProduct;
