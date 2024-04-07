import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { AuthenticatedApiRequest, HttpStatusCode } from '../../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { AccountType } from 'types/enum';
import { exportFoodProductAdmin } from 'lib/api/query/foodProducts';

const GET = async (req: AuthenticatedApiRequest<void, void>, res: NextApiResponse<{ csv: string }>) => {
    const csv = await exportFoodProductAdmin();
    res.status(HttpStatusCode.OK).json({ csv });
};

export default withAuthMethodsAware(
    {
        GET,
    },
    [AccountType.Admin],
);
