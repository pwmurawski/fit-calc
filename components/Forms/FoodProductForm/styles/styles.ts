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

export const AddBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 50px;
  margin-top: 20px;
  background-color: ${({ isError }: { isError?: boolean }) =>
    isError ? "lightgray" : "rgb(77, 216, 158)"};
  border: 0;
  border-radius: 10px;
  color: white;
  font-weight: 800;
  cursor: ${({ isError }: { isError?: boolean }) =>
    isError ? "default" : "pointer"};
`;
