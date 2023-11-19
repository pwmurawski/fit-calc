import { AuthenticatedApiRequest, HttpStatusCode } from '../../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { getFoodProduct } from 'lib/api/query/foodProducts';
import { withMethodsAware } from 'lib/api/with-methods-aware';
import { FoodProductResponse } from 'types/FoodProduct';

interface Query {
    id: string;
}

const GET = async (req: AuthenticatedApiRequest<Query, void>, res: NextApiResponse<FoodProductResponse>) => {
    const { id } = req.query;

    const foodProduct = await getFoodProduct(id);
    res.status(HttpStatusCode.OK).json({ foodProduct });
};

export default withMethodsAware({
    GET,
});
