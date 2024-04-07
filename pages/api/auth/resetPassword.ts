import { registerUser } from 'lib/api/query/auth';
import { AuthenticatedApiRequest, HttpStatusCode } from '../../../lib/api/types';
import { withMethodsAware } from 'lib/api/with-methods-aware';
import { NextApiResponse } from 'next/types';
import { BodyRegister, RegisterResponse } from 'types/Auth';

export default withMethodsAware({
    async POST(req: AuthenticatedApiRequest<void, BodyRegister>, res: NextApiResponse<RegisterResponse>) {
        const userData = req.body;
        const user = await registerUser(userData);
        res.status(HttpStatusCode.OK).json({ user });
    },
});
