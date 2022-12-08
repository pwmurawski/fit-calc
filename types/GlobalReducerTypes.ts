interface ISetMealId {
  type: "setMealId";
  mealId: string | undefined;
}

interface ISetDate {
  type: "setDate";
  date: Date;
}

export interface IState {
  mealId: string | undefined;
  date: Date;
}

export type ActionType = ISetMealId | ISetDate;
