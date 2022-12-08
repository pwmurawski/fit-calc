/* eslint-disable no-unused-vars */
import { ValuesResBackendErrorsType } from "./ResponseTypes";

export interface IFoodProductFormValue {
  code?: string;
  name: string;
  kcal: string;
  protein: string;
  fat: string;
  carbs: string;
}

export type KeysType = "name" | "kcal" | "protein" | "fat" | "carbs" | "code";

export type DefaultValueType = Partial<Record<KeysType, string>>;

export type SubmitType = (
  data: IFoodProductFormValue
) => Promise<Record<KeysType, ValuesResBackendErrorsType> | undefined>;
