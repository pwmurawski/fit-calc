import { hashValue } from 'lib/auth/verify-password';
import { createUser } from './user';
import { User } from '@prisma/client';
import { BodyRegister } from 'types/Auth';
import { changeDailyGoals } from './dailyGoals';

export const registerUser = async (userData: BodyRegister): Promise<User> => {
    const hashPassword = await hashValue(userData.password);

    const user = await createUser({ ...userData, password: hashPassword });
    await changeDailyGoals(user.id, { kcal: '2600', protein: '163', fat: '72', carbs: '325' });
    return user;
};
