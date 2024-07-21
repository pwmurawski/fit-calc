import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { AuthenticatedApiRequest, HttpStatusCode } from '../../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { AccountType } from 'types/enum';
import { getLogs } from 'lib/api/query/logs';
import { LogsAdminTableResponse } from 'types/Logs';

interface Query {
    page: string;
    pageSize: string;
}

const GET = async (req: AuthenticatedApiRequest<Query, void>, res: NextApiResponse<LogsAdminTableResponse>) => {
    const { page, pageSize } = req.query;
    const pageConverted = page ? Number(page) : undefined;
    const pageSizeConverted = pageSize ? Number(pageSize) : undefined;

    const logs = await getLogs(pageConverted, pageSizeConverted);
    res.status(HttpStatusCode.OK).json(logs);
};

export default withAuthMethodsAware(
    {
        GET,
    },
    [AccountType.Admin],
);
