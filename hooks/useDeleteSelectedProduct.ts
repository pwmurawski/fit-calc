import { useSWRConfig } from "swr";
import deleteSelectedProduct from "../api/deleteSelectedProduct";
import useLoading from "./useLoading";

const useDeleteSelectedProduct = () => {
  const { mutate } = useSWRConfig();
  const { setLoading } = useLoading();

  const deleteHandler = async (selectedId: string, dateTime: string) => {
    setLoading(true);
    const res = await deleteSelectedProduct(selectedId);

    if (!res?.code)
      mutate(`/selectedProduct/day/${new Date(dateTime).toLocaleDateString()}`);
    setLoading(false);
  };

  return deleteHandler;
};

export default useDeleteSelectedProduct;
