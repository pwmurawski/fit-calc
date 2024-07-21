import { LoginLog } from '@prisma/client';

export type LogsAdminTableResponse = {
    logs: (Omit<LoginLog, 'dateTime'> & { dateTime: string })[];
    total?: number;
    page?: number;
    pageSize?: number;
};
