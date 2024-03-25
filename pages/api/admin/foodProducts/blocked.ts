import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { AuthenticatedApiRequest, HttpStatusCode } from '../../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { AccountType } from 'types/enum';
import { createBlockedFoodProducts, deleteBlockedFoodProducts } from 'lib/api/query/blockedFoodProducts';
import {
    BlockedFoodProductsBody,
    CreateBlockedFoodProductsResponse,
    DeleteBlockedFoodProductsResponse,
} from 'types/blockedFoodProducts';

interface Query {
    foodProductId: string;
}

const POST = async (
    req: AuthenticatedApiRequest<void, BlockedFoodProductsBody>,
    res: NextApiResponse<CreateBlockedFoodProductsResponse>,
) => {
    const body = req.body;

    const { id } = await createBlockedFoodProducts(body.foodProductId);
    res.status(HttpStatusCode.OK).json({ id });
};

const DELETE = async (
    req: AuthenticatedApiRequest<Query, void>,
    res: NextApiResponse<DeleteBlockedFoodProductsResponse>,
) => {
    const { foodProductId } = req.query;

    await deleteBlockedFoodProducts(foodProductId);
    res.status(HttpStatusCode.OK).json({ message: 'Produkt został przywrócony' });
};

export default withAuthMethodsAware(
    {
        POST,
        DELETE,
    },
    [AccountType.Admin],
);
