import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { AuthenticatedApiRequest, HttpStatusCode } from '../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { DailyGoals } from '@prisma/client';
import { getDailyGoals, changeDailyGoals } from 'lib/api/query/dailyGoals';

interface Query {
    date: string;
}

export type BodyDailyGoals = Record<keyof Omit<DailyGoals, 'id' | 'userId' | 'dateTime'>, string>;

export type DailyGoalsResponse = {
    dailyGoals: DailyGoals | null;
};

const GET = async (req: AuthenticatedApiRequest<Query, void>, res: NextApiResponse<DailyGoalsResponse>) => {
    const userId = req.session.user.id;
    const { date } = req.query;

    const dailyGoals = await getDailyGoals(userId, date);
    res.status(HttpStatusCode.OK).json({ dailyGoals });
};

const POST = async (req: AuthenticatedApiRequest<void, BodyDailyGoals>, res: NextApiResponse<DailyGoalsResponse>) => {
    const userId = req.session.user.id;
    const body = req.body;

    const dailyGoals = await changeDailyGoals(userId, body);
    res.status(HttpStatusCode.OK).json({ dailyGoals });
};

export default withAuthMethodsAware({
    GET,
    POST,
});
