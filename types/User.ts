import { User } from '@prisma/client';

export type UsersAdmin = Array<User & { blockedUser: boolean }>;
export type UsersAdminTableResponse = {
    users: UsersAdmin;
    total?: number;
    page?: number;
    pageSize?: number;
};
export type DeleteUserResponse = { message: string };
