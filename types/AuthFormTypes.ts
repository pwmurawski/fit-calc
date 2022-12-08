/* eslint-disable no-unused-vars */
import { ILoginFormValue } from "./ILoginFormValue";
import { ValuesResBackendErrorsType } from "./ResponseTypes";

export type KeysType = "username" | "password";

export type SubmitType = (
  data: ILoginFormValue
) => Promise<Record<KeysType, ValuesResBackendErrorsType> | undefined>;
