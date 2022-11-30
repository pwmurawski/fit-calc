/* eslint-disable no-unused-vars */
import { IResponse } from "./IResponse";
import { Rules } from "./IRules";

export type ValuesType = {
  value: string;
  error?: string;
  rules: Rules;
};

export type FormInitType<T extends string> = Record<T, ValuesType>;

export type FormType<T> = Record<keyof T, ValuesType>;

export type FormDefaultValueType<T> = Partial<Record<keyof T, string>>;

export type FormRespValueType<T> = Record<keyof T, string>;

export type SubmitType<T> = (data: FormRespValueType<T>) => Promise<
  | IResponse<
      {
        id: string;
      } | null,
      string
    >
  | undefined
>;

export type BackendErrorsValuesType = {
  error?: string;
};
