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

    const start = new Date(
        Date.UTC(new Date(startDate).getFullYear(), new Date(startDate).getMonth(), new Date(startDate).getDate()),
    );
    const end = new Date(
        Date.UTC(new Date(endDate).getFullYear(), new Date(endDate).getMonth(), new Date(endDate).getDate()),
    );

    const summary = await getSummaryByDateRange(userId, start.toISOString(), end.toISOString());
    const daysData = await getSummaryDaysData(userId, start.toISOString(), end.toISOString());

    res.status(HttpStatusCode.OK).json({ ...summary, ...daysData });
};

export default withAuthMethodsAware({
    GET,
});
