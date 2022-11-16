/* eslint-disable no-unused-vars */
import { ValuesType } from "./FormValidType";
import { ILoginFormValue } from "./ILoginFormValue";
import { IResponse } from "./IResponse";

export type KeysType = "username" | "password";

export type LoginFormType = Record<KeysType, ValuesType>;

export type BackendErrorsValuesType = {
  error?: string;
};

export type LoginFormBackendErrorsType = Record<
  KeysType,
  BackendErrorsValuesType
>;

export type SubmitType = (
  data: ILoginFormValue
) => Promise<IResponse<undefined, keyof ILoginFormValue> | undefined>;
