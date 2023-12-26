import { FC, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Ranges, getDateRange } from 'helpers/getDateRange';
import { DateBtn, DateContainer, DateSection, RangesBtn, RangesContainer } from './styles/styles';
import { RightArrow } from 'components/Svg/RightArrow';
import { LeftArrow } from 'components/Svg/LeftArrow';

interface SummarySliderProps {
    getDate: (startDate: Date, endDate: Date) => void;
}

export const SummarySlider: FC<SummarySliderProps> = ({ getDate }) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [range, setRange] = useState(Ranges.Day);

    const startDate = getDateRange(range).start(currentDate, { weekStartsOn: 1 });
    const endDate = getDateRange(range).end(currentDate, { weekStartsOn: 1 });

    const handleNext = () => {
        setCurrentDate(getDateRange(range).add(currentDate, 1));
    };

    const handlePrev = () => {
        setCurrentDate(getDateRange(range).sub(currentDate, 1));
    };

    useEffect(() => {
        setCurrentDate(new Date());
    }, [range]);

    useEffect(() => {
        getDate(startDate, endDate);
    }, [currentDate]);

    return (
        <>
            <RangesContainer>
                <RangesBtn $isActive={range === Ranges.Day} onClick={() => setRange(Ranges.Day)}>
                    Day
                </RangesBtn>
                <RangesBtn $isActive={range === Ranges.Week} onClick={() => setRange(Ranges.Week)}>
                    Week
                </RangesBtn>
                <RangesBtn $isActive={range === Ranges.Month} onClick={() => setRange(Ranges.Month)}>
                    Month
                </RangesBtn>
                <RangesBtn $isActive={range === Ranges.Year} onClick={() => setRange(Ranges.Year)}>
                    Year
                </RangesBtn>
            </RangesContainer>
            <DateContainer>
                <DateBtn onClick={handlePrev}>
                    <LeftArrow />
                </DateBtn>
                <DateSection>
                    {range === Ranges.Day ? (
                        <h2>{format(startDate, 'dd.MM.yyyy')}</h2>
                    ) : (
                        <h2>
                            {format(startDate, 'dd.MM.yyyy')} - {format(endDate, 'dd.MM.yyyy')}
                        </h2>
                    )}
                </DateSection>
                <DateBtn onClick={handleNext}>
                    <RightArrow />
                </DateBtn>
            </DateContainer>
        </>
    );
};
