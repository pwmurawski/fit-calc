import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { NextApiResponse } from 'next/types';
import { AccountType } from 'types/enum';
import { changePassword } from 'lib/api/query/user';
import { AuthenticatedApiRequest, HttpStatusCode } from 'lib/api/types';

export type BodyChangePasswordUser = { oldPassword: string; password: string };

const PUT = async (
    req: AuthenticatedApiRequest<void, BodyChangePasswordUser>,
    res: NextApiResponse<{ message: string }>,
) => {
    const userId = req.session.user.id;
    const body = req.body;

    await changePassword(userId, body);
    res.status(HttpStatusCode.OK).json({ message: 'Hasło zostało zmienione!' });
};

export default withAuthMethodsAware(
    {
        PUT,
    },
    [AccountType.Standard, AccountType.Admin],
);
