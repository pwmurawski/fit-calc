import { sendEmailResetPassword } from 'lib/api/query/user';
import { AuthenticatedApiRequest, HttpStatusCode } from '../../../lib/api/types';
import { withMethodsAware } from 'lib/api/with-methods-aware';
import { NextApiResponse } from 'next/types';

interface Query {
    email: string;
}

const GET = async (req: AuthenticatedApiRequest<Query, void>, res: NextApiResponse<{ message: string }>) => {
    const { email } = req.query;
    await sendEmailResetPassword(email);
    res.status(HttpStatusCode.OK).json({ message: 'Email został wysłany!' });
};

export default withMethodsAware({
    GET,
});
