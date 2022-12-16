/* eslint-disable no-unused-vars */
import { ValuesResBackendErrorsType } from "./ResponseTypes";
import { Rules } from "./RulesTypes";

export type ValuesType = {
  value: string;
  error?: string;
  rules: Rules;
};

export type FormInitType<T extends string> = Record<T, ValuesType>;

export type FormType<T> = Record<keyof T, ValuesType>;

export type FormDefaultValueType<T> = Partial<Record<keyof T, string>>;

export type FormRespValueType<T> = Record<keyof T, string>;

export type SubmitType<T> = (
  data: FormRespValueType<T>
) =>
  | Promise<Record<keyof T, ValuesResBackendErrorsType> | undefined>
  | Promise<void>
  | void;

export type BackendErrorsType<T> = Record<
  keyof T,
  {
    error?: string;
  }
>;
