import { AuthenticatedApiRequest, HttpStatusCode } from '../../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { FoodProduct } from '@prisma/client';
import { getFoodProduct } from 'lib/api/query/foodProducts';
import { withMethodsAware } from 'lib/api/with-methods-aware';

interface Query {
    id: string;
}

export type FoodProductResponse = { foodProduct: FoodProduct | null };

const GET = async (req: AuthenticatedApiRequest<Query, void>, res: NextApiResponse<FoodProductResponse>) => {
    const { id } = req.query;

    const foodProduct = await getFoodProduct(id);
    res.status(HttpStatusCode.OK).json({ foodProduct });
};

export default withMethodsAware({
    GET,
});
