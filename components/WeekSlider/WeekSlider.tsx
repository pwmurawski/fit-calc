import uuid from 'react-uuid';
import { useEffect, useRef, useState } from 'react';
import { dates } from '../../helpers/dates';
import useSlider from '../../hooks/useSlider';
import Day from './Day/Day';
import { Week, Container } from './styles/styles';

interface IWeekSliderProps {
    onClickDay: (date: Date) => void;
}

export default function WeekSlider({ onClickDay }: IWeekSliderProps) {
    const currentDayRef = useRef<HTMLDivElement>(null);
    const [currentWeekPosition, setCurrentWeekPosition] = useState(0);
    const { containerRef, containerWidth, scrollWidth, animation } = useSlider();

    useEffect(() => {
        if (currentDayRef.current?.parentElement)
            setCurrentWeekPosition(currentDayRef.current.parentElement.offsetLeft);
    }, [containerWidth]);

    return (
        <Container
            ref={containerRef}
            drag="x"
            animate={animation}
            initial={false}
            style={{ x: -currentWeekPosition }}
            dragConstraints={{
                left: containerWidth - scrollWidth,
                right: 0,
            }}
        >
            {dates.map((week) => (
                <Week key={uuid()}>
                    {week.map((day) => (
                        <Day key={uuid()} day={day} currentDayRef={currentDayRef} onClick={onClickDay} />
                    ))}
                </Week>
            ))}
        </Container>
    );
}
