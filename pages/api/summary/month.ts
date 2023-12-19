import { AuthenticatedApiRequest, HttpStatusCode } from '../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { getSummaryMonth } from 'lib/api/query/summary';
import { SummaryResponse } from 'types/Summary';

interface Query {
    date: string;
}

const GET = async (req: AuthenticatedApiRequest<Query, void>, res: NextApiResponse<SummaryResponse>) => {
    const userId = req.session.user.id;
    const { date } = req.query;

    const summary = await getSummaryMonth(userId, date);
    res.status(HttpStatusCode.OK).json(summary);
};

export default withAuthMethodsAware({
    GET,
});
