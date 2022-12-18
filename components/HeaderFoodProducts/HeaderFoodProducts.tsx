import { useRouter } from "next/router";
import { BackLink, Container, Logo } from "./styles/styles";
import BackArrowSvg from "../Svg/BackArrowSvg";

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
        <BackArrowSvg />
      </BackLink>
      <Logo>FitCALC</Logo>
    </Container>
  );
}
