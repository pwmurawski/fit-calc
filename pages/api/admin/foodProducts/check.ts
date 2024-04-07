import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { AuthenticatedApiRequest, HttpStatusCode } from '../../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { AccountType } from 'types/enum';
import { checkManyFoodProductExist } from 'lib/api/query/foodProducts';
import { FoodProductsCheckResponse } from 'types/FoodProduct';

const POST = async (req: AuthenticatedApiRequest<void, string[]>, res: NextApiResponse<FoodProductsCheckResponse>) => {
    const foodProductIds = req.body;

    const foodProductIdsChecked = await checkManyFoodProductExist(foodProductIds);
    res.status(HttpStatusCode.OK).json({ ids: foodProductIdsChecked });
};

export default withAuthMethodsAware(
    {
        POST,
    },
    [AccountType.Admin],
);
