import { AuthenticatedApiRequest, HttpStatusCode } from '../../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { getFoodProduct } from 'lib/api/query/foodProducts';
import { FoodProductResponse } from 'types/FoodProduct';
import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';

interface Query {
    id: string;
}

const GET = async (req: AuthenticatedApiRequest<Query, void>, res: NextApiResponse<FoodProductResponse>) => {
    const userId = req.session.user.id;
    const { id } = req.query;

    const foodProduct = await getFoodProduct(id, userId);
    res.status(HttpStatusCode.OK).json({ foodProduct });
};

export default withAuthMethodsAware({
    GET,
});
