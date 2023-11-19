import { useId } from 'react';
import { InputCustomContainer, Input, Label, Error } from './styles/styles';

interface IInputCustomProps {
    type?: string;
    min?: number;
    value?: string | number | readonly string[] | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    placeholder?: string;
    error?: string;
    field?: any;
    form?: any;
}

export function InputCustom({ type, min, value, onChange, placeholder, error, field, form }: IInputCustomProps) {
    const id = useId();

    return (
        <InputCustomContainer error={error ? true : undefined}>
            <Input
                id={`input_${id}`}
                type={type}
                min={min}
                value={value}
                onChange={onChange}
                step="0.1"
                placeholder=" "
                {...field}
            />
            <Label htmlFor={`input_${id}`}>{placeholder}</Label>
            {form?.errors ? <Error>{form.errors[field.name]}</Error> : null}
        </InputCustomContainer>
    );
}
