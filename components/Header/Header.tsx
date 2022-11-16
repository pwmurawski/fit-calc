import useAuth from "../../hooks/useAuth";
import { Container, Logo, LogoutBtn } from "./styles/styles";

export default function Header() {
  const { logoutHandler } = useAuth();

  return (
    <Container>
      <Logo>FitCALC</Logo>
      <LogoutBtn
        onClick={() => {
          logoutHandler();
        }}
      >
        Log out
      </LogoutBtn>
    </Container>
  );
}
