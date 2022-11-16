import { useRouter } from "next/router";
import { ReactNode } from "react";
import Header from "../Header/Header";
import HeaderFoodProducts from "../HeaderFoodProducts/HeaderFoodProducts";
import SearchBar from "../SearchBar/SearchBar";
import { Main, Wrapper } from "./styles/styles";

export default function Layouts({ children }: { children: ReactNode }) {
  const { pathname } = useRouter();

  const headerLinks = ["/", "/login"];
  const layoutSearch = ["/foodProducts", "/foodProducts/search"];

  const header = headerLinks.includes(pathname) ? (
    <Header />
  ) : (
    <HeaderFoodProducts />
  );

  if (layoutSearch.includes(pathname))
    return (
      <Wrapper>
        <Main>
          <HeaderFoodProducts />
          <SearchBar />
          {children}
        </Main>
      </Wrapper>
    );
  return (
    <Wrapper>
      <Main>
        {header}
        {children}
      </Main>
    </Wrapper>
  );
}
