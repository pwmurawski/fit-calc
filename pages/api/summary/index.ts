import { AuthenticatedApiRequest, HttpStatusCode } from '../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { getSummaryByDateRange, getSummaryDaysData } from 'lib/api/query/summary';
import { SummaryResponse } from 'types/Summary';

interface Query {
    startDate: string;
    endDate: string;
}

const GET = async (req: AuthenticatedApiRequest<Query, void>, res: NextApiResponse<SummaryResponse>) => {
    const userId = req.session.user.id;
    const { startDate, endDate } = req.query;

    const summary = await getSummaryByDateRange(userId, startDate, endDate);
    const daysData = await getSummaryDaysData(userId, startDate, endDate);

    res.status(HttpStatusCode.OK).json({ ...summary, ...daysData });
};

export default withAuthMethodsAware({
    GET,
});
