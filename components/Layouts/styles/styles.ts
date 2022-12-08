import styled, { CSSObject } from "styled-components";

const commonStyles: CSSObject = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
};

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const Container = styled.section`
  ${commonStyles};
  max-width: 680px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0 1px 2px 0 rgba(66, 68, 90, 1);

  @media (max-width: 600px) {
    border-radius: 0;
  }
`;

export const Main = styled.main`
  ${commonStyles};
`;
