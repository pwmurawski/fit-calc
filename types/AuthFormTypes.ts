/* eslint-disable no-unused-vars */
import { ILoginFormValue } from "./ILoginFormValue";
import { IResponse } from "./IResponse";

export type KeysType = "username" | "password";

export type SubmitType = (
  data: ILoginFormValue
) => Promise<IResponse<undefined, keyof ILoginFormValue> | undefined>;
