import { AuthenticatedApiRequest, HttpStatusCode } from '../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import {
    createSelectedProducts,
    deleteSelectedProduct,
    getSelectedProduct,
    updateSelectedProduct,
} from 'lib/api/query/selectedProducts';
import {
    BodySelectedProduct,
    DeleteSelectedProductResponse,
    SelectedProductIdResponse,
    SelectedProductResponse,
} from 'types/SelectedProduct';

interface Query {
    id: string;
}

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

    const { id } = await createSelectedProducts(userId, body);
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
