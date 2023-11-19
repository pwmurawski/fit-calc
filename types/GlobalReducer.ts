interface ISetLoading {
  type: "setLoading";
  isLoading: boolean;
}

interface ISetMealId {
  type: "setMealId";
  mealId: string | undefined;
}

interface ISetDate {
  type: "setDate";
  date: Date;
}

export interface IState {
  isLoading: boolean;
  mealId: string | undefined;
  date: Date;
}

export type ActionType = ISetLoading | ISetMealId | ISetDate;
