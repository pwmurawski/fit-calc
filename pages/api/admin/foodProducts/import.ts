import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { AuthenticatedApiRequest, HttpStatusCode } from '../../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { AccountType } from 'types/enum';
import { importFoodProductAdmin } from 'lib/api/query/foodProducts';
import { ImportFoodProductAdmin } from 'types/FoodProduct';

const POST = async (
    req: AuthenticatedApiRequest<void, ImportFoodProductAdmin>,
    res: NextApiResponse<{ message: string }>,
) => {
    const userId = req.session.user.id;
    const body = req.body;

    await importFoodProductAdmin(body, userId);
    res.status(HttpStatusCode.OK).json({ message: 'Dane zostały zaimportowane!' });
};

export default withAuthMethodsAware(
    {
        POST,
    },
    [AccountType.Admin],
);
