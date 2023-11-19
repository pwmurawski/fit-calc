import { hashValue } from 'lib/auth/verify-password';
import { createUser } from './user';
import { User } from '@prisma/client';
import { BodyRegister } from 'types/Auth';

export const registerUser = async (userData: BodyRegister): Promise<User> => {
    const hashPassword = await hashValue(userData.password);

    return await createUser({ ...userData, password: hashPassword });
};
