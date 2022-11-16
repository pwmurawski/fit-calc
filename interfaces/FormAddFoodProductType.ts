/* eslint-disable no-unused-vars */
import { ValuesType } from "./FormValidType";
import { IAddFoodProductFormVal } from "./IAddFoodProductFormVal";
import { IResponse } from "./IResponse";

export type KeysType = "name" | "kcal" | "protein" | "fat" | "carbs" | "code";

export type FormAddFoodProductType = Record<KeysType, ValuesType>;

export type SubmitType = (data: IAddFoodProductFormVal) => Promise<
  | IResponse<
      {
        id: string;
      },
      KeysType
    >
  | undefined
>;
