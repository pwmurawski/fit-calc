/* eslint-disable no-unused-vars */
import { format } from "date-fns";
import { RefObject } from "react";
import { checkDayCurrentDate } from "../../../helpers/checkDayCurrentDate";
import useDate from "../../../hooks/useDate";
import { Container, Name, Number } from "./styles/styles";

interface IDayProps {
  day: Date;
  currentDayRef: RefObject<HTMLDivElement>;
  onClick: (day: Date) => void;
}

export default function Day({ day, currentDayRef, onClick }: IDayProps) {
  const { date } = useDate();

  return (
    <Container
      onClick={() => onClick(day)}
      currentDay={checkDayCurrentDate(day.getDate(), day.getMonth())}
      selectedDay={date.toLocaleDateString() === day.toLocaleDateString()}
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
