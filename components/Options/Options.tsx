import { Container, EditLink } from "./styles/styles";
import EditSvg from "../Svg/EditSvg";

interface IEditBtnProps {
  ids: {
    productId: string;
    productUserId: string;
    userAuthId?: string;
  };
}

export default function Options({
  ids: { productId, productUserId, userAuthId },
}: IEditBtnProps) {
  if (productUserId === userAuthId)
    return (
      <Container>
        <EditLink href={`/foodProducts/edit/${productId}`}>
          <EditSvg />
        </EditLink>
      </Container>
    );
  return null;
}
