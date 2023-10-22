import Head from "next/head";
import FoodProductForm from "../../../components/Forms/FoodProductForm/FoodProductForm";
import useAddFoodProduct from "../../../hooks/useAddFoodProduct";
import { Secured } from "components/security/secured";
import { NextPage } from "next";
import { AccountType } from "types/enum";

const AddFoodProduct: NextPage = () => {
  return (
      <>
          <Head>
              <title>FitCalc | Daily goals</title>
          </Head>
          <Secured
              authorities={[AccountType.Standard, AccountType.Admin,]}
          >
              <AddFoodProductView />
          </Secured>
      </>
  );
};

export default AddFoodProduct;


export function AddFoodProductView() {
  const addFoodProduct = useAddFoodProduct();

  return <FoodProductForm submit={addFoodProduct} />;
}
c