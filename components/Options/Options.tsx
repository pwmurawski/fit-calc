import { Container, EditLink, Icon } from "./styles/styles";
import editIcon from "../../assets/edit.png";

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
          <Icon src={editIcon.src} alt="edit" />
        </EditLink>
      </Container>
    );
  return null;
}
