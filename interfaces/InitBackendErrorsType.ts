export type KeysType = "name" | "kcal" | "protein" | "fat" | "carbs" | "code";
export type ValuesType = {
  error?: string;
};

export type InitBackendErrorsType = Record<KeysType, ValuesType>;
