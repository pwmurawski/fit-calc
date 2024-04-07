import prismaClient from 'lib/app/prisma-client';
import { ApiError } from 'next/dist/server/api-utils';
import { HttpStatusCode } from '../types';
import { BodyRegister } from 'types/Auth';
import {
    changePasswordUserValidationSchema,
    createUserValidationSchema,
    editUserValidationSchema,
} from 'lib/validation/userValidationSchema';
import { validation } from '../validation';
import { generateRandomString } from 'helpers/generateRandomString';
import { sendEmail } from 'helpers/sendEmail';
import { BodyUpdateUser } from 'pages/api/users';
import { BodyChangePasswordUser } from 'pages/api/users/change-password';
import { hashValue, verifyPassword } from 'lib/auth/verify-password';

export const checkUserExist = async (userId: string) => {
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Nie znaleziono użytkownika');
    }
    return user;
};

export const createUser = async (userData: BodyRegister) => {
    const userDataValid = await validation(createUserValidationSchema.validate(userData));

    const user = await prismaClient.user.count({ where: { email: userDataValid.email } });
    if (user) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Użytkownik o podanym adresie e-mail już istnieje!');
    }

    return prismaClient.user.create({ data: userDataValid });
};

export const updateUser = async (userId: string, userData: BodyUpdateUser) => {
    const userDataValid = await validation(editUserValidationSchema.validate(userData));
    await checkUserExist(userId);

    return prismaClient.user.update({ where: { id: userId }, data: userDataValid });
};

export const changePassword = async (userId: string, userData: BodyChangePasswordUser) => {
    const userDataValid = await validation(changePasswordUserValidationSchema.validate(userData));
    const user = await checkUserExist(userId);

    const isVerified = await verifyPassword(userDataValid.oldPassword, user.password);

    if (isVerified) {
        const newPassword = await hashValue(userDataValid.password);

        await sendEmail(user.email, {
            subject: `Zmiana hasła`,
            html: `<div>Hasło zostało zmienione</div>`,
        });

        return prismaClient.user.update({ where: { id: userId }, data: { password: newPassword } });
    }
    throw new ApiError(HttpStatusCode.Forbidden, 'Hasło jest nie prawidłowe!');
};

export const getUsers = async () => {
    const users = await prismaClient.user.findMany({
        select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            userType: true,
        },
    });
    return users;
};

export const getUserId = async (email: string | undefined) => {
    if (email) {
        const user = await prismaClient.user.findUnique({
            where: { email },
            select: {
                id: true,
            },
        });
        return user?.id;
    }
    return undefined;
};

export const resetPassword = async (userId: string) => {
    const user = await checkUserExist(userId);

    const newPassword = generateRandomString(12);
    const hashedPassword = await hashValue(newPassword);

    await sendEmail(user.email, {
        subject: `Reset hasła`,
        html: `<div>Kod: ${newPassword}</div>`,
    });

    return await prismaClient.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
    });
};
