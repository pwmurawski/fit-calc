import { useRouter } from "next/router";
import {
  Container,
  Logo,
  Calendar,
  LogoutBtn,
  LogoutImg,
} from "./styles/styles";
import logout from "../../assets/logout.png";
import useDate from "../../hooks/useDate";
import useAuth from "../../hooks/useAuth";

export default function Header() {
  const { logoutHandler } = useAuth();
  const { date, setDate } = useDate();
  const { pathname } = useRouter();

  return (
    <Container>
      <Logo>FitCALC</Logo>
      {pathname.includes("login") ? null : (
        <>
          <Calendar
            type="date"
            value={date.toLocaleDateString("fr-CA")}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
          <LogoutBtn>
            <LogoutImg
              onClick={() => {
                logoutHandler();
              }}
              src={logout.src}
              alt="logout"
            />
          </LogoutBtn>
        </>
      )}
    </Container>
  );
}
