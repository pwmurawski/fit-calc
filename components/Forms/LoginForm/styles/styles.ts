import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  padding: 50px;
`;

export const SubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 30px;
  margin: 10px 0;
  border: 0;
  border-radius: 10px;
  font-weight: 600;
  color: white;
  background-color: ${({ isError }: { isError?: boolean }) =>
    isError ? "lightgray" : "rgb(77, 216, 158)"};
  cursor: ${({ isError }: { isError?: boolean }) =>
    isError ? "default" : "pointer"};
`;
