import FoodProductForm from "../../../components/Forms/FoodProductForm/FoodProductForm";
import Loading from "../../../components/Loading/Loading";
import userAuth from "../../../helpers/userAuth";
import useEditFoodProduct from "../../../hooks/useEditFoodProduct";
import { IGetServerProps } from "../../../types/GetServerPropsTypes";

interface IParams {
  id: string;
}

export const getServerSideProps = async ({
  params,
  req,
  res,
}: IGetServerProps<IParams>) => {
  const { isUser } = userAuth(req, res);
  if (!isUser)
    return {
      redirect: {
        destination: "/login",
      },
    };

  return { props: { params } };
};

interface IEditProps {
  params: IParams;
}

export default function Edit({ params }: IEditProps) {
  const { id } = params;
  const { editFoodProduct, defaultValue } = useEditFoodProduct(id);

  if (!defaultValue) return <Loading stopClick />;
  return (
    <FoodProductForm submit={editFoodProduct} defaultValue={defaultValue} />
  );
}
