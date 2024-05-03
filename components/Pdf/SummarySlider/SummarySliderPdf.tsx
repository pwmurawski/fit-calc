import { FC } from 'react';
import { format } from 'date-fns';
import { DateContainer, DateSection } from './styles/styles';

interface SummarySliderPdfProps {
    startDate: string;
    endDate: string;
}

export const SummarySliderPdf: FC<SummarySliderPdfProps> = ({ startDate, endDate }) => {
    return (
        <>
            <DateContainer>
                <DateSection>
                    {format(new Date(startDate), 'dd.MM.yyyy') === format(new Date(endDate), 'dd.MM.yyyy') ? (
                        <h2>{format(new Date(startDate), 'dd.MM.yyyy')}</h2>
                    ) : (
                        <h2>
                            {format(new Date(startDate), 'dd.MM.yyyy')} - {format(new Date(endDate), 'dd.MM.yyyy')}
                        </h2>
                    )}
                </DateSection>
            </DateContainer>
        </>
    );
};
