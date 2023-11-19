import { InputCustom } from '../../InputCustom/InputCustom';
import { AddBtn, Form, ScannerContainer } from './styles/styles';
import Scanner from '../../Scanner/Scanner';
import { Field, Formik } from 'formik';
import { createFoodProductValidationSchema } from 'lib/validation/foodProductValidationSchema';
import { BodyFoodProducts } from 'types/FoodProduct';

const initialValues: BodyFoodProducts = {
    name: '',
    kcal: '',
    protein: '',
    fat: '',
    carbs: '',
    code: '',
};

interface IFoodProductFormProps {
    submit: (data: BodyFoodProducts) => Promise<void>;
    defaultValue?: BodyFoodProducts;
}

export function FoodProductForm({ submit, defaultValue }: IFoodProductFormProps) {
    const handleSubmit = (values: BodyFoodProducts) => {
        submit(values);
    };

    return (
        <Formik
            initialValues={defaultValue ?? initialValues}
            onSubmit={handleSubmit}
            validationSchema={createFoodProductValidationSchema}
        >
            {({ submitForm, setFieldValue, isValid }) => (
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitForm();
                    }}
                >
                    <Field component={InputCustom} name="name" placeholder="Name" type="text" />
                    <Field component={InputCustom} name="kcal" placeholder="Kcal" type="number" min={0} />
                    <Field component={InputCustom} name="protein" placeholder="Protein" type="number" min={0} />
                    <Field component={InputCustom} name="fat" placeholder="Fat" type="number" min={0} />
                    <Field component={InputCustom} name="carbs" placeholder="Carbs" type="number" min={0} />
                    <ScannerContainer>
                        <Field component={InputCustom} name="code" placeholder="Code" type="number" min={0} />
                        <Scanner onScanned={(data) => setFieldValue('code', data)} />
                    </ScannerContainer>
                    {!!isValid ? (
                        <AddBtn type="submit">Dodaj</AddBtn>
                    ) : (
                        <AddBtn type="button" isError>
                            Dodaj
                        </AddBtn>
                    )}
                </Form>
            )}
        </Formik>
    );
}
