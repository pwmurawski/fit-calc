import { format } from "date-fns";
import { useSWRConfig } from "swr";
import deleteSelectedProduct from "../_api/deleteSelectedProduct";
import useLoading from "./useLoading";

const useDeleteSelectedProduct = () => {
  const { mutate } = useSWRConfig();
  const { setLoading } = useLoading();

  const deleteHandler = async (selectedId: string, date: string) => {
    setLoading(true);
    const res = await deleteSelectedProduct(selectedId);

    if (!res?.code)
      mutate(`/selectedProduct/day/${format(new Date(date), "yyyy-MM-dd")}`);
    setLoading(false);
  };

  return deleteHandler;
};

export default useDeleteSelectedProduct;
