import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { AuthenticatedApiRequest, HttpStatusCode } from '../../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { AccountType } from 'types/enum';
import { createVerifiedFoodProducts, deleteVerifiedFoodProducts } from 'lib/api/query/verifiedFoodProducts';
import {
    CreateVerifiedFoodProductsResponse,
    DeleteVerifiedFoodProductsResponse,
    VerifiedFoodProductsBody,
} from 'types/verifiedFoodProducts';

interface Query {
    foodProductId: string;
}

const POST = async (
    req: AuthenticatedApiRequest<void, VerifiedFoodProductsBody>,
    res: NextApiResponse<CreateVerifiedFoodProductsResponse>,
) => {
    const body = req.body;

    const { id } = await createVerifiedFoodProducts(body.foodProductId);
    res.status(HttpStatusCode.OK).json({ id });
};

const DELETE = async (
    req: AuthenticatedApiRequest<Query, void>,
    res: NextApiResponse<DeleteVerifiedFoodProductsResponse>,
) => {
    const { foodProductId } = req.query;

    await deleteVerifiedFoodProducts(foodProductId);
    res.status(HttpStatusCode.OK).json({ message: 'Produkt został usunięty' });
};

export default withAuthMethodsAware(
    {
        POST,
        DELETE,
    },
    [AccountType.Admin],
);
