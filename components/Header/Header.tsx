import { useContext } from "react";
import useAuth from "../../hooks/useAuth";
import {
  Calendar,
  Container,
  Logo,
  LogoutBtn,
  LogoutImg,
} from "./styles/styles";
import logout from "../../assets/logout.png";
import GlobalContext from "../../context/GlobalContext/GlobalContext";

export default function Header() {
  const { state, dispatch } = useContext(GlobalContext);
  const { isUser, logoutHandler } = useAuth();

  return (
    <Container>
      <Logo>FitCALC</Logo>
      {isUser ? (
        <>
          <Calendar
            type="date"
            value={state.date?.toLocaleDateString("fr-CA")}
            onChange={(e) =>
              dispatch({ type: "setDate", date: new Date(e.target.value) })
            }
          />
          <LogoutBtn
            onClick={() => {
              logoutHandler();
            }}
          >
            <LogoutImg src={logout.src} alt="logout" />
          </LogoutBtn>
        </>
      ) : null}
    </Container>
  );
}
