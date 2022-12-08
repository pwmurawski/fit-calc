/* eslint-disable no-unused-vars */
import { format } from "date-fns";
import { RefObject, useContext } from "react";
import GlobalContext from "../../../context/GlobalContext";
import { checkDayCurrentDate } from "../../../helpers/checkDayCurrentDate";
import { Container, Name, Number } from "./styles/styles";

interface IDayProps {
  day: Date;
  currentDayRef: RefObject<HTMLDivElement>;
  onClick: (day: Date) => void;
}

export default function Day({ day, currentDayRef, onClick }: IDayProps) {
  const { state } = useContext(GlobalContext);

  return (
    <Container
      onClick={() => onClick(day)}
      currentDay={checkDayCurrentDate(day.getDate(), day.getMonth())}
      selectedDay={
        state.date?.toLocaleDateString() === day.toLocaleDateString()
      }
      ref={
        checkDayCurrentDate(day.getDate(), day.getMonth())
          ? currentDayRef
          : undefined
      }
    >
      <Number>{day.getDate()}</Number>
      <Name>{format(day, "E")}</Name>
    </Container>
  );
}
