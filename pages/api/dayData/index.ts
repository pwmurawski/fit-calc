import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { AuthenticatedApiRequest, HttpStatusCode } from '../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { getDayData } from 'lib/api/query/daysData';
import { DayDataResponse } from 'types/DayData';

interface Query {
    date: string;
}

export default withAuthMethodsAware({
    async GET(req: AuthenticatedApiRequest<Query, void>, res: NextApiResponse<DayDataResponse>) {
        const userId = req.session.user.id;
        const { date } = req.query;

        const daysData = await getDayData(userId, date);
        res.status(HttpStatusCode.OK).json(daysData);
    },
});
