import { format } from 'date-fns';
import { RefObject } from 'react';
import { checkDateIsCurrentDate } from '../../../helpers/checkDateIsCurrentDate';
import useDate from '../../../hooks/useDate';
import { Container, Name, Number } from './styles/styles';

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
            currentDay={checkDateIsCurrentDate(day)}
            selectedDay={date === day}
            ref={checkDateIsCurrentDate(day) ? currentDayRef : undefined}
        >
            <Number>{day.getDate()}</Number>
            <Name>{format(day, 'E')}</Name>
        </Container>
    );
}
