import { AuthenticatedApiRequest, HttpStatusCode } from '../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { FoodProduct, SelectedProduct } from '@prisma/client';
import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import {
    createSelectedProductsDay,
    deleteSelectedProduct,
    getSelectedProduct,
    updateSelectedProduct,
} from 'lib/api/query/selectedProducts';

interface Query {
    id: string;
}
export type BodySelectedProduct = Record<keyof Omit<SelectedProduct, 'id' | 'userId'>, string>;
export type SelectedProductIdResponse = {
    id: string;
};
export type SelectedProductResponse = {
    selectedProduct: (SelectedProduct & { foodProduct: Omit<FoodProduct, 'id' | 'userId'> }) | null;
};
export type DeleteSelectedProductResponse = {
    message: string;
};

const GET = async (req: AuthenticatedApiRequest<Query, void>, res: NextApiResponse<SelectedProductResponse>) => {
    const userId = req.session.user.id;
    const { id } = req.query;

    const selectedProduct = await getSelectedProduct(id, userId);
    res.status(HttpStatusCode.OK).json({ selectedProduct });
};

const POST = async (
    req: AuthenticatedApiRequest<void, BodySelectedProduct>,
    res: NextApiResponse<SelectedProductIdResponse>,
) => {
    const userId = req.session.user.id;
    const body = req.body;

    const { id } = await createSelectedProductsDay(userId, body);
    res.status(HttpStatusCode.OK).json({ id });
};

const PUT = async (
    req: AuthenticatedApiRequest<Query, Pick<BodySelectedProduct, 'weight'>>,
    res: NextApiResponse<SelectedProductIdResponse>,
) => {
    const userId = req.session.user.id;
    const { id } = req.query;
    const body = req.body;

    const newSelectedProductData = await updateSelectedProduct(id, userId, body);
    res.status(HttpStatusCode.OK).json({ id: newSelectedProductData.id });
};

const DELETE = async (
    req: AuthenticatedApiRequest<Query, void>,
    res: NextApiResponse<DeleteSelectedProductResponse>,
) => {
    const userId = req.session.user.id;
    const { id } = req.query;

    await deleteSelectedProduct(id, userId);
    res.status(HttpStatusCode.OK).json({ message: 'Produkt został usunięty' });
};

export default withAuthMethodsAware({
    GET,
    POST,
    PUT,
    DELETE,
});
