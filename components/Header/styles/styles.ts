import styled from "styled-components";

export const Container = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
`;

export const Logo = styled.h1`
  flex: 1 1 85px;
  font-size: 22px;
  height: 30px;
  margin: 0;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;

export const LogoutBtn = styled.button`
  display: flex;
  flex: 1.3 1 25px;
  justify-content: flex-end;
  background-color: transparent;
  height: 25px;
  border: 0;
  padding: 0;
`;

export const LogoutImg = styled.img`
  width: inherit;
  height: inherit;
  cursor: pointer;
`;

export const Calendar = styled.input`
  border: 0;
  padding: 0 5px;
  width: 120px;
  font-size: 15px;
  font-weight: bold;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  cursor: pointer;
`;
