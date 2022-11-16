import Link from "next/link";
import styled from "styled-components";

export const Container = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: whitesmoke;
  margin-bottom: 5px;
  padding: 18px;
  border-radius: 5px;
  cursor: pointer;
`;

export const FoodContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 405px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;

export const FoodMacro = styled.div`
  display: felx;
  justify-content: flex-start;
  align-items: center;
  min-width: 77px;
  width: fit-content;
  padding: 0;
  font-size: 13px;
  font-weight: 600;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Name = styled.h2`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  font-size: 18px;
  white-space: nowrap;
`;

export const Value = styled.span`
  font-weight: 400;
  color: green;
  align-self: flex-start;
`;

export const Weight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: fit-content;
  font-size: 16px;
`;
