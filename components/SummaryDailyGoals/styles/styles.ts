import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  background-color: rgb(210, 255, 242);
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.div``;

export const Value = styled.div<{ isError?: boolean }>`
  color: ${({ isError }) => (isError ? "red" : "green")};
  font-weight: 600;
`;

export const Paragraph = styled.p`
  color: gray;
  font-size: 13px;
  margin: 0;
`;
