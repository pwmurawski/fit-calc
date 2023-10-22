import prismaClient from 'lib/app/prisma-client';
import { ApiError } from 'next/dist/server/api-utils';
import { HttpStatusCode } from '../types';
import { RegisterData } from 'types/Auth';
import { createUserValidationSchema } from 'lib/validation/createUserValidationSchema';

export const createUser = async (userData: RegisterData) => {
    const userDataValid = await createUserValidationSchema.validate(userData).catch(() => {
        throw new ApiError(HttpStatusCode.Forbidden, 'Nie prawidłowe dane!');
    });

    const user = await prismaClient.user.findUnique({ where: { email: userDataValid.email } });
    if (user) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Użytkownik o podanym adresie e-mail już istnieje!');
    }

    return prismaClient.user.create({ data: userDataValid });
};
