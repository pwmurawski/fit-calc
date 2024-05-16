import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { AuthenticatedApiRequest, HttpStatusCode } from '../../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { AccountType } from 'types/enum';
import {
    deleteFoodProductAdmin,
    getAllFoodProductsNotBlocked,
    getAllFoodProductsBlocked,
    updateFoodProductAdmin,
} from 'lib/api/query/foodProducts';
import {
    BodyFoodProducts,
    CreateFoodProductResponse,
    DeleteFoodProductResponse,
    FoodProductsAdminTableResponse,
} from 'types/FoodProduct';

interface Query {
    id: string;
    page: string;
    pageSize: string;
    blocked: string;
}

const GET = async (req: AuthenticatedApiRequest<Query, void>, res: NextApiResponse<FoodProductsAdminTableResponse>) => {
    const { page, pageSize, blocked } = req.query;
    const pageConverted = page ? Number(page) : undefined;
    const pageSizeConverted = pageSize ? Number(pageSize) : undefined;

    if (blocked === 'true') {
        const foodProductsBlocked = await getAllFoodProductsBlocked(pageConverted, pageSizeConverted);
        res.status(HttpStatusCode.OK).json(foodProductsBlocked);
    } else {
        const foodProducts = await getAllFoodProductsNotBlocked(pageConverted, pageSizeConverted);
        res.status(HttpStatusCode.OK).json(foodProducts);
    }
};

const PUT = async (
    req: AuthenticatedApiRequest<Query, BodyFoodProducts>,
    res: NextApiResponse<CreateFoodProductResponse>,
) => {
    const { id } = req.query;
    const body = req.body;

    await updateFoodProductAdmin(id, body);
    res.status(HttpStatusCode.OK).json({ id });
};

const DELETE = async (req: AuthenticatedApiRequest<Query, void>, res: NextApiResponse<DeleteFoodProductResponse>) => {
    const { id } = req.query;

    await deleteFoodProductAdmin(id);
    res.status(HttpStatusCode.OK).json({ message: 'Produkt został usunięty' });
};

export default withAuthMethodsAware(
    {
        GET,
        PUT,
        DELETE,
    },
    [AccountType.Admin],
);
