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
import { changePasswordTemplate, resetPasswordTemplate, sendEmailResetPasswordTemplate } from 'helpers/emailTemplates';

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
            subject: 'Zmiana hasła',
            html: changePasswordTemplate,
        });

        return prismaClient.user.update({ where: { id: userId }, data: { password: newPassword } });
    }
    throw new ApiError(HttpStatusCode.Forbidden, 'Hasło jest nie prawidłowe!');
};

export const checkUserExistByCode = async (code: string) => {
    const user = await prismaClient.user.count({ where: { password: decodeURIComponent(code) } });
    if (!user) {
        return false;
    }
    return true;
};

export const checkUserExistByCode2 = async (code: string) => {
    const user = await prismaClient.user.findFirst({ where: { password: decodeURIComponent(code) } });
    if (!user) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Nie znaleziono użytkownika');
    }
    return user;
};

export const changePasswordByCode = async (code: string, newPassword: string) => {
    const user = await checkUserExistByCode2(code);

    if (decodeURIComponent(code) === user.password) {
        const hashPassword = await hashValue(newPassword);

        await prismaClient.user.update({ where: { id: user.id }, data: { password: hashPassword } });
        await sendEmail(user.email, {
            subject: 'Zmiana hasła',
            html: changePasswordTemplate,
        });
    } else {
        throw new ApiError(HttpStatusCode.Forbidden, 'Hasło jest nie prawidłowe!');
    }
};

export const sendEmailResetPassword = async (email: string) => {
    const user = await prismaClient.user.findUnique({ where: { email }, select: { password: true } });
    if (!user) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Nie znaleziono użytkownika');
    }

    const encodedSecretKey = encodeURIComponent(user?.password);
    await sendEmail(email, {
        subject: 'Reset hasła',
        html: sendEmailResetPasswordTemplate(encodedSecretKey),
    });
};

export const getUsersNotBlocked = async (page?: number, pageSize?: number) => {
    const skip = page && pageSize ? (page - 1) * pageSize : undefined;

    const users = await prismaClient.user.findMany({
        where: { blockedUser: null },
        include: { blockedUser: true },
        take: pageSize,
        skip,
    });
    const total = await prismaClient.user.count({
        where: { blockedUser: null },
    });

    return {
        users: users.map((user) => ({
            ...user,
            blockedUser: Boolean(user.blockedUser),
        })),
        total,
        page,
        pageSize,
    };
};

export const getUsersBlocked = async (page?: number, pageSize?: number) => {
    const skip = page && pageSize ? (page - 1) * pageSize : undefined;

    const users = await prismaClient.blockedUser.findMany({
        select: { user: { include: { blockedUser: true } } },
        take: pageSize,
        skip,
    });
    const total = await prismaClient.blockedUser.count();

    return {
        users: users.map(({ user }) => ({
            ...user,
            blockedUser: Boolean(user.blockedUser),
        })),
        total,
        page,
        pageSize,
    };
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
        subject: 'Reset hasła',
        html: resetPasswordTemplate(newPassword),
    });

    return await prismaClient.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
    });
};

export const deleteUserAdmin = async (id: string) => {
    await checkUserExist(id);
    await prismaClient.dailyGoals.deleteMany({ where: { userId: id } });
    await prismaClient.selectedProduct.deleteMany({ where: { userId: id } });
    await prismaClient.blockedUser.delete({ where: { userId: id } });
    await prismaClient.userFoodProductCount.deleteMany({ where: { userId: id } });
    await prismaClient.foodProduct.updateMany({ where: { userId: id }, data: { userId: undefined } });
    await prismaClient.user.delete({ where: { id } });
};
