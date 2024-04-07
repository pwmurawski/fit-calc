import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { AuthenticatedApiRequest, HttpStatusCode } from '../../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { AccountType } from 'types/enum';
import { resetPassword } from 'lib/api/query/user';

interface Query {
    userId: string;
}

const PUT = async (req: AuthenticatedApiRequest<Query, void>, res: NextApiResponse<{ message: string }>) => {
    const { userId } = req.query;

    await resetPassword(userId);
    res.status(HttpStatusCode.OK).json({ message: 'Hasło zostało zresetowne!' });
};

export default withAuthMethodsAware(
    {
        PUT,
    },
    [AccountType.Admin],
);
