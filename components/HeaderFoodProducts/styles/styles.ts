import styled from "styled-components";
import Link from "next/link";

export const Container = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
`;
export const BackLink = styled(Link)`
  position: absolute;
  left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

export const Logo = styled.h1`
  margin: 0;
  font-size: 22px;
`;
