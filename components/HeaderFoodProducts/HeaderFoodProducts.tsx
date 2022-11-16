import { BackLink, Container, Icon, Logo } from "./styles/styles";
import arrowIcon from "../../assets/arrow.png";

export default function HeaderFoodProducts() {
  return (
    <Container>
      <BackLink href="./">
        <Icon src={arrowIcon.src} alt="back" />
      </BackLink>
      <Logo>FitCALC</Logo>
    </Container>
  );
}
