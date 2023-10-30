export interface FoodProductType {
    id: string;
    userId: string;
    code?: string | null;
    name: string;
    kcal: number;
    protein: number;
    fat: number;
    carbs: number;
}

export type FoodProductKeyType = keyof Pick<FoodProductType, 'kcal' | 'protein' | 'fat' | 'carbs'>;
