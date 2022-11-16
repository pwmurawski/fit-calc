interface ISetMealId {
  type: "setMealId";
  mealId: string | undefined;
}

interface ISetDate {
  type: "setDate";
  date: Date | undefined;
}

export interface IState {
  mealId: string | undefined;
  date: Date | undefined;
}

export type ActionType = ISetMealId | ISetDate;
