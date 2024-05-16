import { AuthenticatedApiRequest, HttpStatusCode } from '../../../lib/api/types';
import { withMethodsAware } from 'lib/api/with-methods-aware';
import { NextApiResponse } from 'next/types';
import { changePasswordByCode } from 'lib/api/query/user';

interface Body {
    code: string;
    newPassword: string;
}

const PUT = async (req: AuthenticatedApiRequest<void, Body>, res: NextApiResponse<{ message: string }>) => {
    const { code, newPassword } = req.body;
    await changePasswordByCode(code, newPassword);
    res.status(HttpStatusCode.OK).json({ message: 'Hasło zostało zmienione' });
};

export default withMethodsAware({
    PUT,
});
