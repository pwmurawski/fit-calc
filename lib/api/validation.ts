import { ApiError } from 'next/dist/server/api-utils';
import { HttpStatusCode } from './types';

export const validation = async <T>(validationSchema: Promise<T>) => {
    return await validationSchema.catch(() => {
        throw new ApiError(HttpStatusCode.Forbidden, 'Nie prawidłowe dane!');
    });
};
