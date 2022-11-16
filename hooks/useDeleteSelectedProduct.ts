import { useSWRConfig } from "swr";
import deleteSelectedProduct from "../api/deleteSelectedProduct";

const useDeleteSelectedProduct = () => {
  const { mutate } = useSWRConfig();

  const deleteHandler = async (selectedId: string, dateTime: string) => {
    const res = await deleteSelectedProduct(selectedId);
    if (!res?.code)
      mutate(`/selectedProduct/day/${new Date(dateTime).toLocaleDateString()}`);
  };

  return deleteHandler;
};

export default useDeleteSelectedProduct;
