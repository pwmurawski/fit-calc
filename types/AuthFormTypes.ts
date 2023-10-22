/* eslint-disable no-unused-vars */
import { ILoginFormValue } from './Auth';

export type KeysType = 'name' | 'surname' | 'email' | 'password';

export type SubmitType = (data: ILoginFormValue) => Promise<boolean | undefined | void> | void;
