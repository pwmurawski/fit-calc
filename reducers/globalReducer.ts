import { ActionType, IState } from "../types/IGlobalReducer";

export const globalReducer = (state: IState, action: ActionType) => {
  switch (action.type) {
    case "setMealId":
      return { ...state, mealId: action.mealId };

    case "setDate":
      return { ...state, date: action.date };

    default:
      throw new Error("There is no such action");
  }
};

export const initialState: IState = {
  mealId: undefined,
  date: new Date(),
};
