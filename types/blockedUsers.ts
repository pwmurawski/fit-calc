import { BlockedUser } from '@prisma/client';

export interface BlockedUsersResponse {
    users: BlockedUser[];
}
export interface BlockedUsersBody {
    userId: string;
}
export type CreateBlockedUsersResponse = { id: string };
export type DeleteBlockedUsersResponse = { message: string };
