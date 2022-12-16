import { useEffect, useState } from "react";
import gramsToKcal from "../helpers/gramsToKcal";
import kcalToGrams from "../helpers/kcalToGrams";
import { toPercent } from "../helpers/toPercent";
import { Keys, KeysPercentMacro } from "../types/DailyGoalsFormTypes";
import { FormInitType } from "../types/FormTypes";
import useForm from "./useForm";

const initPercentMacro = {
  protein: "",
  fat: "",
  carbs: "",
};

const useDailyGoalsForm = (
  initValue: FormInitType<Keys>,
  defaultValue?: Partial<Record<Keys, string>>
) => {
  const { formValue, onChange, onSubmitHandler, setFormData } = useForm(
    initValue,
    defaultValue
  );
  const [percentMacro, setPercentMacro] = useState(initPercentMacro);
  const [totalPercent, setTotalPercent] = useState(0);
  const [isUpdating, setIsUpdating] = useState({
    formValue: true,
    percentMacro: false,
  });

  useEffect(() => {
    if (+formValue.kcal.value && isUpdating.formValue) {
      Object.keys(percentMacro).forEach((key) => {
        const keys = key as KeysPercentMacro;
        setPercentMacro((state) => ({
          ...state,
          [keys]: Math.round(
            toPercent(
              gramsToKcal(+formValue[keys].value, keys),
              +formValue.kcal.value
            )
          ).toString(),
        }));
      });
    }
  }, [formValue]);

  useEffect(() => {
    if (+formValue.kcal.value && isUpdating.percentMacro) {
      Object.keys(percentMacro).forEach((key) => {
        const keys = key as KeysPercentMacro;
        setFormData((state) => ({
          ...state,
          [keys]: {
            ...state[keys],
            value: Math.round(
              kcalToGrams(
                (+formValue.kcal.value * +percentMacro[keys]) / 100,
                keys
              )
            ).toString(),
          },
        }));
      });
    }
  }, [formValue.kcal.value, percentMacro]);

  useEffect(() => {
    setTotalPercent(
      Object.values(percentMacro).reduce((sum, curr) => sum + +curr, 0)
    );
  }, [percentMacro]);

  return {
    formValue,
    onChange,
    onSubmitHandler,
    percentMacro,
    setPercentMacro,
    totalPercent,
    isUpdating,
    setIsUpdating,
  };
};

export default useDailyGoalsForm;
