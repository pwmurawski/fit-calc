import { FoodProductType } from '../../../types/FoodProduct';
import FoodProduct from './FoodProduct/FoodProduct';

interface IFoodProductsProps {
    foodProductsData: FoodProductType[];
}

export default function FoodProducts({ foodProductsData }: IFoodProductsProps) {
    return (
        <>
            {foodProductsData.map((foodProductData) => (
                <FoodProduct key={foodProductData.id} foodProductData={foodProductData} />
            ))}
        </>
    );
}
