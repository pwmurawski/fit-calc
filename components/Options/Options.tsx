import { Container, EditLink, Icon } from "./styles/styles";
import editIcon from "../../assets/edit.png";

interface IEditBtnProps {
  ids: {
    foodProductId: string;
    foodProductUserId: string;
    userAuthId?: string;
  };
}

export default function Options({
  ids: { foodProductId, foodProductUserId, userAuthId },
}: IEditBtnProps) {
  if (foodProductUserId === userAuthId)
    return (
      <Container>
        <EditLink href={`/foodProducts/edit/${foodProductId}`}>
          <Icon src={editIcon.src} alt="edit" />
        </EditLink>
      </Container>
    );
  return null;
}
