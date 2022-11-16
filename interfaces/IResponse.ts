export type ValuesResBackendErrorsType =
  | {
      errors: string[];
    }
  | [];

export interface IResponse<Data, ErrorsKeys extends string> {
  status: number;
  token?: string;
  data?: Data;
  code?: number;
  message?: string;
  errors?: {
    children: Record<ErrorsKeys, ValuesResBackendErrorsType>;
  };
}
