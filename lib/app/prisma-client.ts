import { PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prismaClient = new PrismaClient();
    process.env.TZ = 'UTC';
} else {
    // @ts-ignore
    if (!global.prismaClient) {
        // @ts-ignore
        global.prismaClient = new PrismaClient();
        process.env.TZ = 'UTC';
    }
    // @ts-ignore
    prismaClient = global.prismaClient;
}

export default prismaClient;
