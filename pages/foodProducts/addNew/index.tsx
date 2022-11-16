import AddFoodProductForm from "../../../components/Forms/AddFoodProductForm/AddFoodProductForm";
import useAddFoodProduct from "../../../hooks/useAddFoodProduct";
import userAuth from "../../../helpers/userAuth";
import { IGetServerProps } from "../../../interfaces/IGetServerProps";

export const getServerSideProps = async ({ req, res }: IGetServerProps) => {
  const { token } = userAuth(req, res);
  if (!token)
    return {
      redirect: {
        destination: "/login",
      },
    };

  return { props: {} };
};

export default function AddNew() {
  const addFoodProduct = useAddFoodProduct();

  return <AddFoodProductForm submit={addFoodProduct} />;
}
