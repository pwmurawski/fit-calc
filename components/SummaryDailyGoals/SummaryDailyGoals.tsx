import { Wrapper, Container, Label, Paragraph, Value } from './styles/styles';

interface ISummaryDailyGoalsProps {
    totalPercent: number;
}

export default function SummaryDailyGoals({ totalPercent }: ISummaryDailyGoalsProps) {
    return (
        <Wrapper>
            <Container>
                <Label>Razem: </Label>
                <Value isError={totalPercent !== 100}>{totalPercent}%</Value>
            </Container>
            <Paragraph>Łączna wartość % makroskładników musi wynosić 100%</Paragraph>
        </Wrapper>
    );
}
