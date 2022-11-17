import styled, { css } from "styled-components";

export const Container = styled.div`
  --width: 80px;
  --height: 20px;

  position: absolute;
  top: calc(50% - var(--height) / 2);
  left: calc(50% - var(--width) / 2);
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--width);
  height: var(--height);
  z-index: 1;

  ${({ stopClick }: { stopClick?: boolean }) =>
    stopClick &&
    css`
      top: 0;
      left: 0;
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
