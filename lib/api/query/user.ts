import prismaClient from 'lib/app/prisma-client';
import { ApiError } from 'next/dist/server/api-utils';
import { HttpStatusCode } from '../types';
import { RegisterData } from 'types/Auth';
import { createUserValidationSchema } from 'lib/validation/userValidationSchema';
import { validation } from '../validation';

export const checkUserExist = async (userId: string) => {
    const user = await prismaClient.user.count({ where: { id: userId } });
    if (!user) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Nie znaleziono użytkownika');
    }
};

export const createUser = async (userData: RegisterData) => {
    const userDataValid = await validation(createUserValidationSchema.validate(userData));

    const user = await prismaClient.user.count({ where: { email: userDataValid.email } });
    if (user) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Użytkownik o podanym adresie e-mail już istnieje!');
    }

    return prismaClient.user.create({ data: userDataValid });
};
