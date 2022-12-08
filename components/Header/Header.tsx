import useAuth from "../../hooks/useAuth";
import {
  Calendar,
  Container,
  Logo,
  LogoutBtn,
  LogoutImg,
} from "./styles/styles";
import logout from "../../assets/logout.png";
import useDate from "../../hooks/useDate";

export default function Header() {
  const { date, setDate } = useDate();
  const { isUser, logoutHandler } = useAuth();

  return (
    <Container>
      <Logo>FitCALC</Logo>
      {isUser ? (
        <>
          <Calendar
            type="date"
            value={date.toLocaleDateString("fr-CA")}
            onChange={(e) => setDate(new Date(e.target.value))}
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
