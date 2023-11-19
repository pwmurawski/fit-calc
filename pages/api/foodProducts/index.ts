import { AuthenticatedApiRequest, HttpStatusCode } from '../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { createFoodProduct, getFoodProducts, updateFoodProduct } from 'lib/api/query/foodProducts';
import { BodyFoodProducts, CreateFoodProductResponse, FoodProductsResponse } from 'types/FoodProduct';

interface Query {
    id: string;
}

const GET = async (req: AuthenticatedApiRequest<void, void>, res: NextApiResponse<FoodProductsResponse>) => {
    const foodProducts = await getFoodProducts();
    res.status(HttpStatusCode.OK).json({ foodProducts });
};

const POST = async (
    req: AuthenticatedApiRequest<void, BodyFoodProducts>,
    res: NextApiResponse<CreateFoodProductResponse>,
) => {
    const userId = req.session.user.id;
    const body = req.body;

    const { id } = await createFoodProduct(userId, body);
    res.status(HttpStatusCode.OK).json({ id });
};

const PUT = async (
    req: AuthenticatedApiRequest<Query, BodyFoodProducts>,
    res: NextApiResponse<CreateFoodProductResponse>,
) => {
    const userId = req.session.user.id;
    const { id } = req.query;
    const body = req.body;

    await updateFoodProduct(id, userId, body);
    res.status(HttpStatusCode.OK).json({ id });
};

export default withAuthMethodsAware({
    GET,
    POST,
    PUT,
});
