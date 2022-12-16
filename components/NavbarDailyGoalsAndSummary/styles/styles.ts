import Link from "next/link";
import styled from "styled-components";

export const Container = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  height: 35px;
  box-shadow: 0 2px 2px 0 lightgray;
`;

export const LinkStyled = styled(Link)<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  height: 100%;
  border-bottom: ${({ isActive }) =>
    isActive ? "3px solid rgb(77, 216, 158)" : "none"};
`;
