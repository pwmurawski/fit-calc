import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 15px;
  background-color: rgb(77, 216, 158);
`;

export const Input = styled.input`
  background-color: white;
  border-radius: 13px;
  border: 0;
  width: 100%;
  height: 40px;
  font-size: 14px;
  text-align: right;
  padding: 5px 8px;

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: textfield;
  }
`;

export const Unit = styled.div`
  margin: 0 10px;
  color: white;
  font-weight: 600;
`;

export const Kcal = styled.div`
  white-space: nowrap;
  color: white;
  font-weight: 600;
  margin: 0 10px;
`;

export const SubmitBtn = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid white;
  border-radius: 50%;
  max-width: 35px;
  max-height: 35px;
  min-width: 35px;
  min-height: 35px;
  cursor: pointer;
  background-color: transparent;

  ::before {
    content: "";
    position: absolute;
    bottom: 9px;
    left: 8.5px;
    width: 14px;
    height: 3px;
    background-color: white;
    border-radius: 15px;
    transform: rotate(-45deg);
  }

  ::after {
    content: "";
    position: absolute;
    top: 9px;
    left: 8.5px;
    width: 14px;
    height: 3px;
    background-color: white;
    border-radius: 15px;
    transform: rotate(45deg);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 250px;
  width: 100%;
`;
