import styled from "styled-components";
import Link from "next/link";

export const Container = styled.section`
  position: absolute;
  right: 0;
  top: 80px;
  display: flex;
  padding: 10px 5px;
`;

export const EditLink = styled(Link)`
  margin: 0 5px;
`;

export const Icon = styled.img`
  width: 25px;
  height: auto;
`;
