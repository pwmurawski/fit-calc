import styled from "styled-components";

export const Container = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0 20px;
`;

export const Logo = styled.h1`
  font-size: 22px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;

export const LogoutBtn = styled.button`
  background-color: transparent;
  width: 25px;
  height: 25px;
  border: 0;
  padding: 0;
  cursor: pointer;
`;

export const LogoutImg = styled.img`
  width: inherit;
  height: inherit;
`;

export const Calendar = styled.input`
  border: 0;
  width: 120px;
  font-size: 15px;
  font-weight: bold;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  cursor: pointer;
`;
