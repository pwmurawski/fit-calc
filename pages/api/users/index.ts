import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { NextApiResponse } from 'next/types';
import { AccountType } from 'types/enum';
import { User } from '@prisma/client';
import { checkUserExist, updateUser } from 'lib/api/query/user';
import { AuthenticatedApiRequest, HttpStatusCode } from 'lib/api/types';
import { omit } from 'lodash';

const GET = async (
    req: AuthenticatedApiRequest<void, void>,
    res: NextApiResponse<{ user: Omit<User, 'password'> }>,
) => {
    const userId = req.session.user.id;

    const user = await checkUserExist(userId);
    res.status(HttpStatusCode.OK).json({ user: omit(user, 'password') });
};

export type BodyUpdateUser = Pick<User, 'name' | 'surname' | 'email'>;

const PUT = async (req: AuthenticatedApiRequest<void, BodyUpdateUser>, res: NextApiResponse<{ message: string }>) => {
    const userId = req.session.user.id;
    const body = req.body;

    await updateUser(userId, body);
    res.status(HttpStatusCode.OK).json({ message: 'Użytkownik został zaktualizowany!' });
};

export default withAuthMethodsAware(
    {
        GET,
        PUT,
    },
    [AccountType.Standard, AccountType.Admin],
);
