import { Form, SubmitBtn, Input, Kcal, Unit, Container } from './styles/styles';
import { Field, Formik } from 'formik';

const initialValues: { weight: number | string } = {
    weight: '',
};

interface WeightInputProps {
    defaultValues?: { weight: number | string } | undefined;
    kcal: number;
    submit: (value: number) => void;
}

export function WeightForm({ submit, kcal, defaultValues }: WeightInputProps) {
    const handleSubmit = (values: { weight: number | string }) => {
        submit(Number(values.weight));
    };

    return (
        <Formik initialValues={defaultValues ?? initialValues} onSubmit={handleSubmit}>
            {({ values, submitForm }) => (
                <Form>
                    <Container>
                        <Field as={Input} type="number" name="weight" step="0.1" placeholder="0" min="0" />
                        <Unit>g</Unit>
                    </Container>
                    <Kcal>{Number(((kcal * +values.weight) / 100).toFixed(1))} kcal</Kcal>
                    <SubmitBtn
                        type="submit"
                        aria-label="Submit"
                        onClick={(e) => {
                            e.preventDefault();
                            submitForm();
                        }}
                    />
                </Form>
            )}
        </Formik>
    );
}
