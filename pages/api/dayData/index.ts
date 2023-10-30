import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { AuthenticatedApiRequest, HttpStatusCode } from '../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { MealsData } from 'types/MealTypes';
import { SummaryCalorieMacroData } from 'types/SummaryCalorieMacroData';
import { getDayData } from 'lib/api/query/daysData';

interface Query {
    date: string;
}

export type DayDataResponse = {
    mealsData: MealsData[];
    summaryData: SummaryCalorieMacroData;
};

export default withAuthMethodsAware({
    async GET(req: AuthenticatedApiRequest<Query, void>, res: NextApiResponse<DayDataResponse>) {
        const userId = req.session.user.id;
        const { date } = req.query;

        const daysData = await getDayData(userId, date);
        res.status(HttpStatusCode.OK).json(daysData);
    },
});
