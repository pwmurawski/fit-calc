import { useEffect } from "react";
import isErrorForm from "../../../helpers/isErrorForm";
import useDailyGoalsForm from "../../../hooks/useDailyGoalsForm";
import { Keys, OnPercentType } from "../../../types/DailyGoalsFormTypes";
import {
  FormDefaultValueType,
  FormInitType,
  SubmitType,
} from "../../../types/FormTypes";
import {
  Wrapper,
  Input,
  UnitKcal,
  Label,
  Container,
  Unit,
  SubmitBtn,
} from "./styles/styles";

const initValue: FormInitType<Keys> = {
  kcal: {
    value: "",
    rules: ["required"],
  },
  protein: {
    value: "",
    rules: ["required"],
  },
  fat: {
    value: "",
    rules: ["required"],
  },
  carbs: {
    value: "",
    rules: ["required"],
  },
};

interface IDailyGoalsFormProps {
  onSubmit: SubmitType<typeof initValue>;
  onPercent: OnPercentType;
  defaultValue: FormDefaultValueType<typeof initValue>;
}

export default function DailyGoalsForm({
  onSubmit,
  onPercent,
  defaultValue,
}: IDailyGoalsFormProps) {
  const {
    formValue,
    onChange,
    onSubmitHandler,
    percentMacro,
    setPercentMacro,
    totalPercent,
    setIsUpdating,
  } = useDailyGoalsForm(initValue, defaultValue);

  useEffect(() => {
    onPercent(totalPercent);
  }, [totalPercent]);

  return (
    <Wrapper
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitHandler((data) => onSubmit(data));
      }}
    >
      {totalPercent === 100 && !isErrorForm(formValue) ? (
        <SubmitBtn type="submit">Zapisz</SubmitBtn>
      ) : null}
      <Container>
        <Label htmlFor="kcal">Zapotrzebowanie</Label>
        <Container>
          <Input
            id="kcal"
            type="number"
            value={formValue.kcal.value}
            onChange={(e) => onChange(e.target.value, "kcal")}
            onFocus={() => {
              setIsUpdating({ formValue: false, percentMacro: true });
            }}
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
            value={formValue.protein.value}
            isError={totalPercent !== 100}
            onChange={(e) => onChange(e.target.value, "protein")}
            onFocus={() => {
              setIsUpdating({ formValue: true, percentMacro: false });
            }}
          />
          <Unit>g</Unit>
          <Input
            type="number"
            value={percentMacro.protein}
            isError={totalPercent !== 100}
            onChange={(e) =>
              setPercentMacro({ ...percentMacro, protein: e.target.value })
            }
            onFocus={() => {
              setIsUpdating({ formValue: false, percentMacro: true });
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
            value={formValue.fat.value}
            isError={totalPercent !== 100}
            onChange={(e) => onChange(e.target.value, "fat")}
            onFocus={() => {
              setIsUpdating({ formValue: true, percentMacro: false });
            }}
          />
          <Unit>g</Unit>
          <Input
            type="number"
            value={percentMacro.fat}
            isError={totalPercent !== 100}
            onChange={(e) =>
              setPercentMacro({ ...percentMacro, fat: e.target.value })
            }
            onFocus={() => {
              setIsUpdating({ formValue: false, percentMacro: true });
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
            value={formValue.carbs.value}
            isError={totalPercent !== 100}
            onChange={(e) => onChange(e.target.value, "carbs")}
            onFocus={() => {
              setIsUpdating({ formValue: true, percentMacro: false });
            }}
          />
          <Unit>g</Unit>
          <Input
            type="number"
            value={percentMacro.carbs}
            isError={totalPercent !== 100}
            onChange={(e) =>
              setPercentMacro({ ...percentMacro, carbs: e.target.value })
            }
            onFocus={() => {
              setIsUpdating({ formValue: false, percentMacro: true });
            }}
            aria-label="Carbs percent"
          />
          <Unit>%</Unit>
        </Container>
      </Container>
    </Wrapper>
  );
}
