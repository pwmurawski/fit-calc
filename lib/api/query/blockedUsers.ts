import prismaClient from 'lib/app/prisma-client';

export const getBlockedUsers = async () => {
    return await prismaClient.blockedUser.findMany();
};

export const createBlockedUsers = async (userId: string) => {
    return await prismaClient.blockedUser.create({ data: { userId } });
};

export const deleteBlockedUsers = async (userId: string) => {
    return await prismaClient.blockedUser.delete({ where: { userId } });
};
