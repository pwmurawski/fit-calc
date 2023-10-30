import { AuthenticatedApiRequest, HttpStatusCode } from '../../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { FoodProduct } from '@prisma/client';
import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { searchFoodProducts } from 'lib/api/query/foodProducts';

interface Query {
    term?: string;
}

export type FoodProductsResponse = { foodProducts: FoodProduct[] };

export default withAuthMethodsAware({
    async GET(req: AuthenticatedApiRequest<Query, void>, res: NextApiResponse<FoodProductsResponse>) {
        const { term } = req.query;

        const foodProducts = await searchFoodProducts(term);
        res.status(HttpStatusCode.OK).json({ foodProducts });
    },
});
