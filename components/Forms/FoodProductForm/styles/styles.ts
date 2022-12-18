import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

export const ScannerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const AddBtn = styled.button<{ isError?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 50px;
  margin-top: 20px;
  background-color: ${({ isError }) =>
    isError ? "white" : "rgb(77, 216, 158)"};
  color: ${({ isError }) => (isError ? "black" : "white")};
  border: ${({ isError }) => (isError ? "1px solid lightgray" : "0")};
  border-radius: 10px;
  font-weight: 600;
  cursor: ${({ isError }) => (isError ? "default" : "pointer")};
`;
