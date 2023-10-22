import { NextApiRequest } from 'next';
import { Session } from 'next-auth';
import { NextApiResponse } from 'next/dist/shared/lib/utils';

export type TypedNextApiRequest<TQuery = NextApiRequest['query'], TBody = void> = Omit<
    NextApiRequest,
    'query' | 'body'
> & {
    query: TQuery;
    body: TBody;
};

export type AuthenticatedApiRequest<TQuery = NextApiRequest['query'], TBody = void> = TypedNextApiRequest<
    TQuery,
    TBody
> & {
    session: Session;
};

export declare type AuthenticatedApiHandler<TQuery = NextApiRequest['query'], TBody = void, TResponse = any> = (
    req: AuthenticatedApiRequest<TQuery, TBody>,
    res: NextApiResponse<TResponse>,
) => unknown | Promise<unknown>;

export enum HttpStatusCode {
    OK = 200,
    Created = 201,
    BadRequest = 400,
    NotAuthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    InternalServerError = 500,
}

export enum HttpMethod {
    Delete = 'DELETE',
    Put = 'PUT',
    Get = 'GET',
    Post = 'POST',
    Patch = 'PATCH',
}
