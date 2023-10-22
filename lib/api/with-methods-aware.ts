import { AuthenticatedApiRequest, HttpMethod, HttpStatusCode } from 'lib/api/types';
import { NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

export const withMethodsAware = (
    handlers: Partial<Record<string, (req: any, res: any) => Promise<unknown | undefined> | void>>,
    errorMessage?: string,
) => {
    return async (req: AuthenticatedApiRequest, res: NextApiResponse) => {
        const method = req.method as HttpMethod | undefined;
        if (!method) {
            return res.status(HttpStatusCode.BadRequest).json({
                error: 'Nie określono metody HTTP',
            });
        }

        const handler = handlers[method];
        if (!handler) {
            console.error(method);
            return res.status(HttpStatusCode.BadRequest).json({
                error: 'Niedozwolona metoda HTTP',
            });
        }

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
