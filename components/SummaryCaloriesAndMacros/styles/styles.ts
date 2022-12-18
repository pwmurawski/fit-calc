import Link from "next/link";
import styled from "styled-components";

export const Container = styled(Link)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding: 20px 0;
  font-size: 13px;
`;

export const Macro = styled.div`
  color: black;
`;

export const ValueSlider = styled.div`
  position: relative;
  width: 100%;
  height: 5px;
  border-radius: 10px;
  background-color: lightgray;
  margin-bottom: 2px;

  ::before {
    content: "";
    position: absolute;
    max-width: 100%;
    width: ${({ value }: { value?: number }) => value ?? 0}%;
    height: 5px;
    border-radius: 10px;
    background-color: ${({ value }: { value?: number }) => {
      if (value) if (value > 100) return "red";
      return "rgb(77, 216, 158)";
    }};
  }
`;

export const CurrentValue = styled.div``;

export const Name = styled.span``;

export const LimitValue = styled.div``;

export const Unit = styled.span``;
