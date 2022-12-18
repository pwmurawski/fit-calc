/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Form, SubmitBtn, Input, Kcal, Unit, Container } from "./styles/styles";

interface IWeightInputProps {
  submit: (value: string) => void;
  kcal: number;
}

export default function WeightForm({ submit, kcal }: IWeightInputProps) {
  const [weight, setWeight] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        submit(weight);
      }}
    >
      <Container>
        <Input
          type="number"
          step="0.1"
          placeholder="0"
          min="0"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <Unit>g</Unit>
      </Container>
      <Kcal>{Number(((kcal * +weight) / 100).toFixed(1))} kcal</Kcal>
      <SubmitBtn type="submit" aria-label="Submit" />
    </Form>
  );
}
