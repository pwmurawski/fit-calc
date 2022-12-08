import fitCalcApi from "./fitCalcApi";

const putSelectedProduct = async (id: string, weight: number) => {
  const data = await fitCalcApi<null>(`/selectedProduct/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ weight }),
    credentials: "include",
  });
  return data;
};

export default putSelectedProduct;
