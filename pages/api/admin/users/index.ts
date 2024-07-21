import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { AuthenticatedApiRequest, HttpStatusCode } from '../../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { AccountType } from 'types/enum';
import { deleteUserAdmin, getUsersBlocked, getUsersNotBlocked } from 'lib/api/query/user';
import { DeleteUserResponse, UsersAdminTableResponse } from 'types/User';

interface Query {
    id: string;
    page: string;
    pageSize: string;
    blocked: string;
}

const GET = async (req: AuthenticatedApiRequest<Query, void>, res: NextApiResponse<UsersAdminTableResponse>) => {
    const { page, pageSize, blocked } = req.query;
    const pageConverted = page ? Number(page) : undefined;
    const pageSizeConverted = pageSize ? Number(pageSize) : undefined;

    if (blocked === 'true') {
        const users = await getUsersBlocked(pageConverted, pageSizeConverted);
        res.status(HttpStatusCode.OK).json(users);
    } else {
        const users = await getUsersNotBlocked(pageConverted, pageSizeConverted);
        res.status(HttpStatusCode.OK).json(users);
    }
};

const DELETE = async (req: AuthenticatedApiRequest<Query, void>, res: NextApiResponse<DeleteUserResponse>) => {
    const { id } = req.query;

    await deleteUserAdmin(id);
    res.status(HttpStatusCode.OK).json({ message: 'Użytkownik został usunięty' });
};

export default withAuthMethodsAware(
    {
        GET,
        DELETE,
    },
    [AccountType.Admin],
);
