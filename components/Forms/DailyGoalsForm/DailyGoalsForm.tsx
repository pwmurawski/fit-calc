import { useEffect } from 'react';
import useDailyGoalsForm from '../../../hooks/useDailyGoalsForm';
import { Form, Input, UnitKcal, Label, Container, Unit, SubmitBtn } from './styles/styles';
import { BodyDailyGoals } from 'types/DailyGoals';

interface DailyGoalsFormProps {
    onSubmit: (data: BodyDailyGoals) => Promise<void>;
    onPercent: (data: number) => void;
    initialValues: BodyDailyGoals;
}

export default function DailyGoalsForm({ onSubmit, onPercent, initialValues }: DailyGoalsFormProps) {
    const {
        values,
        setFieldValue,
        errors,
        submitForm,
        isValid,
        percentMacro,
        setPercentMacro,
        totalPercent,
        setIsUpdating,
    } = useDailyGoalsForm(initialValues, onSubmit);

    useEffect(() => {
        onPercent(totalPercent);
    }, [totalPercent]);

    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                submitForm();
            }}
        >
            {totalPercent === 100 && isValid ? <SubmitBtn type="submit">Zapisz</SubmitBtn> : null}
            <Container>
                <Label htmlFor="kcal">Zapotrzebowanie</Label>
                <Container>
                    <Input
                        id="kcal"
                        type="number"
                        value={values.kcal}
                        onChange={(e) => setFieldValue('kcal', e.target.value)}
                        onFocus={() => {
                            setIsUpdating({ values: false, percentMacro: true });
                        }}
                        isError={Boolean(errors.kcal)}
                    />
                    <UnitKcal>kcal</UnitKcal>
                </Container>
            </Container>
            <Container>
                <Label htmlFor="protein">Białka</Label>
                <Container>
                    <Input
                        id="protein"
                        type="number"
                        value={values.protein}
                        onChange={(e) => setFieldValue('protein', e.target.value)}
                        isError={Boolean(errors.protein) || totalPercent !== 100}
                        onFocus={() => {
                            setIsUpdating({ values: true, percentMacro: false });
                        }}
                    />
                    <Unit>g</Unit>
                    <Input
                        type="number"
                        value={percentMacro.protein}
                        isError={totalPercent !== 100}
                        onChange={(e) => setPercentMacro({ ...percentMacro, protein: e.target.value })}
                        onFocus={() => {
                            setIsUpdating({ values: false, percentMacro: true });
                        }}
                        aria-label="Protein percent"
                    />
                    <Unit>%</Unit>
                </Container>
            </Container>
            <Container>
                <Label htmlFor="fat">Tłuszcze</Label>
                <Container>
                    <Input
                        id="fat"
                        type="number"
                        value={values.fat}
                        onChange={(e) => setFieldValue('fat', e.target.value)}
                        isError={Boolean(errors.fat) || totalPercent !== 100}
                        onFocus={() => {
                            setIsUpdating({ values: true, percentMacro: false });
                        }}
                    />
                    <Unit>g</Unit>
                    <Input
                        type="number"
                        value={percentMacro.fat}
                        isError={totalPercent !== 100}
                        onChange={(e) => setPercentMacro({ ...percentMacro, fat: e.target.value })}
                        onFocus={() => {
                            setIsUpdating({ values: false, percentMacro: true });
                        }}
                        aria-label="Fat percent"
                    />
                    <Unit>%</Unit>
                </Container>
            </Container>
            <Container>
                <Label htmlFor="carbs">Węgl.</Label>
                <Container>
                    <Input
                        id="carbs"
                        type="number"
                        value={values.carbs}
                        onChange={(e) => setFieldValue('carbs', e.target.value)}
                        isError={Boolean(errors.carbs) || totalPercent !== 100}
                        onFocus={() => {
                            setIsUpdating({ values: true, percentMacro: false });
                        }}
                    />
                    <Unit>g</Unit>
                    <Input
                        type="number"
                        value={percentMacro.carbs}
                        isError={totalPercent !== 100}
                        onChange={(e) => setPercentMacro({ ...percentMacro, carbs: e.target.value })}
                        onFocus={() => {
                            setIsUpdating({ values: false, percentMacro: true });
                        }}
                        aria-label="Carbs percent"
                    />
                    <Unit>%</Unit>
                </Container>
            </Container>
        </Form>
    );
}
