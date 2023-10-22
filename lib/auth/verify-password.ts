/* eslint-disable no-return-await */
import { compare, hash } from "bcryptjs";

export async function hashValue(value: string) {
  return await hash(value, 12);
}

export const verifyPassword = async (
  userProvidedPassword: string,
  databasePassword: string
) => {
  const isEqual = await compare(userProvidedPassword, databasePassword);
  return isEqual;
};
