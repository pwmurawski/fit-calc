import { ActionType, IState } from '../types/GlobalReducer';

export const globalReducer = (state: IState, action: ActionType) => {
    switch (action.type) {
        case 'setLoading':
            return { ...state, isLoading: action.isLoading };

        case 'setMealId':
            return { ...state, mealId: action.mealId };

        case 'setDate':
            return { ...state, date: action.date };

        default:
            throw new Error('There is no such action');
    }
};

export const initialState: IState = {
    isLoading: false,
    mealId: undefined,
    date: new Date(),
};
