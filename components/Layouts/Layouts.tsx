import { useRouter } from "next/router";
import { ReactNode } from "react";
import Header from "../Header/Header";
import HeaderFoodProducts from "../HeaderFoodProducts/HeaderFoodProducts";
import NavbarDailyGoalsAndSummary from "../NavbarDailyGoalsAndSummary/NavbarDailyGoalsAndSummary";
import SearchBar from "../SearchBar/SearchBar";
import { Container, Wrapper, Main } from "./styles/styles";

export default function Layouts({ children }: { children: ReactNode }) {
  const { pathname } = useRouter();

  const headers = [{ path: ["/", "/login"], component: <Header /> }];
  const components = [
    {
      path: ["/foodProducts", "/foodProducts/search"],
      component: <SearchBar />,
    },
    {
      path: ["/dailyGoals", "/summary"],
      component: <NavbarDailyGoalsAndSummary />,
    },
  ];

  const active = {
    headers: headers.find((layout) => layout.path.includes(pathname)),
    components: components.find((layout) => layout.path.includes(pathname)),
  };

  return (
    <Wrapper>
      <Container>
        {active.headers ? active.headers.component : <HeaderFoodProducts />}
        {active.components ? active.components.component : null}
        <Main>{children}</Main>
      </Container>
    </Wrapper>
  );
}
