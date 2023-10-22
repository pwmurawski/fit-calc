import { hashValue } from 'lib/auth/verify-password';
import { createUser } from './user';
import { User } from '@prisma/client';
import { RegisterData } from 'types/Auth';

export const registerUser = async (userData: RegisterData): Promise<User> => {
    const hashPassword = await hashValue(userData.password);

    return await createUser({ ...userData, password: hashPassword });
};
