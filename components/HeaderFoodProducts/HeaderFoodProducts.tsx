import { useRouter } from "next/router";
import { BackLink, Container, Icon, Logo } from "./styles/styles";
import arrowIcon from "../../assets/arrow.png";

export default function HeaderFoodProducts() {
  const { pathname, query } = useRouter();

  const href = (): string => {
    if (pathname.includes("edit")) return `/foodProducts/${query.id}`;
    if (pathname.includes("selectedProduct")) return `/`;
    return "./";
  };

  return (
    <Container>
      <BackLink href={href()}>
        <Icon src={arrowIcon.src} alt="back" />
      </BackLink>
      <Logo>FitCALC</Logo>
    </Container>
  );
}
