import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { AuthenticatedApiRequest, HttpStatusCode } from '../../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { AccountType } from 'types/enum';
import { User } from '@prisma/client';
import { getUsers } from 'lib/api/query/user';

const GET = async (
    req: AuthenticatedApiRequest<void, void>,
    res: NextApiResponse<{ users: Omit<User, 'password'>[] }>,
) => {
    const users = await getUsers();
    res.status(HttpStatusCode.OK).json({ users });
};

export default withAuthMethodsAware(
    {
        GET,
    },
    [AccountType.Admin],
);
