import styled from "styled-components";

export const ScannerContainer = styled.div`
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  width: 60%;
  border-radius: 20px;
  background-color: black;
  overflow: hidden;
  z-index: 1;
`;

export const ScannBtn = styled.button`
  position: absolute;
  right: 0;
  width: 30px;
  height: 30px;
  border: 0;
  padding: 0;
  margin-right: 10px;
  background-color: transparent;
  cursor: pointer;
`;

export const RedLine = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: red;
`;
