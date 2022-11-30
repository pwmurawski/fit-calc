import styled, { css } from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 20px;
  z-index: 1;

  ${({ stopClick }: { stopClick?: boolean }) =>
    stopClick &&
    css`
      width: 100%;
      height: 100%;
    `}
`;

export const Spinner = styled.div`
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  animation: rotation 1s infinite ease-in-out;
`;
