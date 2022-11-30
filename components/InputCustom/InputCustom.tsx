import { useRef } from "react";
import { InputCustomContainer, Input, Label, Error } from "./styles/styles";

interface IInputCustomProps {
  type?: string;
  min?: number;
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder?: string;
  error?: string;
}

const defaultProps = {
  type: undefined,
  min: undefined,
  value: undefined,
  onChange: undefined,
  placeholder: null,
  error: undefined,
};

export default function InputCustom({
  type,
  min,
  value,
  onChange,
  placeholder,
  error,
}: IInputCustomProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <InputCustomContainer error={error ? true : undefined}>
      <Input
        type={type}
        min={min}
        ref={inputRef}
        value={value}
        onChange={onChange}
        step="0.1"
        placeholder=" "
      />
      <Label onClick={() => inputRef.current?.focus()}>{placeholder}</Label>
      {error ? <Error>{error}</Error> : null}
    </InputCustomContainer>
  );
}

InputCustom.defaultProps = defaultProps;
