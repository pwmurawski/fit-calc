import prismaClient from 'lib/app/prisma-client';

export const getLogs = async (page?: number, pageSize?: number) => {
    const skip = page && pageSize ? (page - 1) * pageSize : undefined;

    const logs = await prismaClient.loginLog.findMany({
        take: pageSize,
        skip,
    });
    const total = await prismaClient.loginLog.count({});

    return {
        logs: logs.map((log) => ({
            ...log,
            dateTime: log.dateTime.toLocaleString() ?? '',
        })),
        total,
        page,
        pageSize,
    };
};

export const createLogs = async (email: string, log?: string) => {
    return await prismaClient.loginLog.create({ data: { email, log } });
};
