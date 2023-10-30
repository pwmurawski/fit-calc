import { AuthenticatedApiRequest, HttpStatusCode } from '../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { FoodProduct } from '@prisma/client';
import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { getFoodProducts } from 'lib/api/query/foodProducts';

export type FoodProductsResponse = { foodProducts: FoodProduct[] };

export default withAuthMethodsAware({
    async GET(req: AuthenticatedApiRequest<void, void>, res: NextApiResponse<FoodProductsResponse>) {
        const foodProducts = await getFoodProducts();
        res.status(HttpStatusCode.OK).json({ foodProducts });
    },
});
