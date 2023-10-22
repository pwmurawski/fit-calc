import { registerUser } from 'lib/api/query/auth';
import { AuthenticatedApiRequest, HttpStatusCode } from '../../../lib/api/types';
import { withMethodsAware } from 'lib/api/with-methods-aware';
import { NextApiResponse } from 'next/types';
import { User } from '@prisma/client';
import { RegisterData } from 'types/Auth';

export type RegisterResponse = { user: User };

export default withMethodsAware({
    async POST(req: AuthenticatedApiRequest<void, RegisterData>, res: NextApiResponse<RegisterResponse>) {
        const userData = req.body;
        const user = await registerUser(userData);
        res.status(HttpStatusCode.OK).json({ user });
    },
});
