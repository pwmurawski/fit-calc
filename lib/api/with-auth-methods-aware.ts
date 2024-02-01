import { AuthenticatedApiRequest, HttpMethod, HttpStatusCode } from 'lib/api/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from './session';
import { ApiError } from 'next/dist/server/api-utils';
import { AccountType } from 'types/enum';

export const withAuthMethodsAware = (
    handlers: Partial<Record<string, (req: any, res: any) => Promise<unknown | undefined> | void>>,
    accountType = Object.values(AccountType),
    errorMessage?: string,
) => {
    return async (req: AuthenticatedApiRequest, res: NextApiResponse) => {
        const method = req.method as HttpMethod | undefined;
        if (!method) {
            return res.status(HttpStatusCode.BadRequest).json({
                error: 'Nie określono metody HTTP',
            });
        }

        const session = await getServerSession(req as NextApiRequest, res as NextApiResponse);

        if (!session) {
            return res.status(HttpStatusCode.NotAuthorized).json({
                error: 'Nieautoryzowana akcja',
            });
        }

        if (!accountType.includes(session.user.userType)) {
            return res.status(HttpStatusCode.Forbidden).json({
                error: 'Forbidden',
            } as any);
        }

        const handler = handlers[method];
        if (!handler) {
            console.error(method);
            return res.status(HttpStatusCode.BadRequest).json({
                error: 'Niedozwolona metoda HTTP',
            });
        }

        req.session = session;

        try {
            return await handler(req, res);
        } catch (error) {
            if (error instanceof ApiError) {
                console.error('ApiError', error);
                return res.status(error.statusCode).json({ error: error.message } as any);
            }
            console.error('ERROR', error);
            return res.status(HttpStatusCode.InternalServerError).json({
                message: errorMessage || 'Coś poszło nie tak',
            } as any);
        }
    };
};
