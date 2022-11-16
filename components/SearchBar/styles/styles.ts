import styled from "styled-components";

export const Container = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 3px solid rgb(77, 216, 158);
  padding: 10px;
  margin: 0 15px;
`;

export const Input = styled.input`
  width: 100%;
  border: 0;
  padding: 0;
  outline: none;
  background-color: transparent;
  font-size: 15px;
`;

export const Scanner = styled.div`
  position: absolute;
  top: 0;
  left: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  border-radius: 20px;
  background-color: black;
  overflow: hidden;

  .dbrScanner-video {
    width: 100%;
    height: 100%;
  }
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

export const Icon = styled.img`
  width: 100%;
  height: auto;
`;

export const RedLine = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: red;
`;
