import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { AuthenticatedApiRequest, HttpStatusCode } from '../../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { AccountType } from 'types/enum';
import { BlockedUsersBody, CreateBlockedUsersResponse, DeleteBlockedUsersResponse } from 'types/blockedUsers';
import { createBlockedUsers, deleteBlockedUsers } from 'lib/api/query/blockedUsers';

interface Query {
    userId: string;
}

const POST = async (
    req: AuthenticatedApiRequest<void, BlockedUsersBody>,
    res: NextApiResponse<CreateBlockedUsersResponse>,
) => {
    const body = req.body;

    const { id } = await createBlockedUsers(body.userId);
    res.status(HttpStatusCode.OK).json({ id });
};

const DELETE = async (req: AuthenticatedApiRequest<Query, void>, res: NextApiResponse<DeleteBlockedUsersResponse>) => {
    const { userId } = req.query;

    await deleteBlockedUsers(userId);
    res.status(HttpStatusCode.OK).json({ message: 'Użytkownik został przywrócony' });
};

export default withAuthMethodsAware(
    {
        POST,
        DELETE,
    },
    [AccountType.Admin],
);
