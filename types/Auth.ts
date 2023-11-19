import { User } from '@prisma/client';

export type BodyLogin = Pick<User, 'email' | 'password'>;
export type BodyRegister = Omit<User, 'id' | 'userType'>;
export type RegisterResponse = { user: User };
