import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  height: 95vh;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0 1px 2px 0 rgba(66, 68, 90, 1);
  overflow: hidden;

  @media (max-width: 600px) {
    height: 100vh;
    border-radius: 0;
  }
`;
