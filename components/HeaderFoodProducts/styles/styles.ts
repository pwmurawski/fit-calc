import styled from "styled-components";
import Link from "next/link";

export const Container = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 50px;
`;
export const BackLink = styled(Link)`
  position: absolute;
  left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const Logo = styled.h1`
  margin: 0;
  font-size: 22px;
`;

export const Icon = styled.img`
  width: 100%;
  height: auto;
`;
