import { PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prismaClient = new PrismaClient();
} else {
    // @ts-ignore
    if (!global.prismaClient) {
        // @ts-ignore
        global.prismaClient = new PrismaClient();
    }
    // @ts-ignore
    prismaClient = global.prismaClient;
}

export default prismaClient;
