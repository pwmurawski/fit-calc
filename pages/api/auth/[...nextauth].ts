import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prismaClient from '../../../lib/app/prisma-client';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/auth/verify-password';
import { omit } from 'lodash';
import { AccountType } from '../../../types/enum';
import { ApiError } from 'next/dist/server/api-utils';
import { HttpStatusCode } from 'lib/api/types';
import { loginValidationSchema } from 'lib/validation/authValidationSchema';
import { validation } from 'lib/api/validation';
import { createLogs } from 'lib/api/query/logs';

export const nextAuthOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prismaClient),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                log: { label: 'log', type: 'string' },
            },

            async authorize(credentials, req) {
                debugger;
                const credentialsValid = await validation(loginValidationSchema.validate(credentials));
                if (credentialsValid) {
                    const user = await prismaClient.user.findUnique({
                        where: { email: credentialsValid.email },
                        select: {
                            id: true,
                            name: true,
                            surname: true,
                            email: true,
                            password: true,
                            userType: true,
                            blockedUser: true,
                        },
                    });

                    if (!user || !user.password) {
                        throw new ApiError(
                            HttpStatusCode.NotAuthorized,
                            'Nie znaleziono użytkownika o podanym adresie e-mail!',
                        );
                    }

                    if (user.blockedUser?.blocked) {
                        throw new ApiError(
                            HttpStatusCode.NotAuthorized,
                            'Użytkownik o podanym adresie e-mail jest zablokowany!',
                        );
                    }

                    const isVerified = await verifyPassword(credentialsValid.password, user.password);

                    if (!isVerified) {
                        throw new ApiError(HttpStatusCode.NotAuthorized, 'Podane hasło jest nieprawidłowe!');
                    }

                    await createLogs(user.email, credentials?.log);

                    return omit(user, 'password');
                } else {
                    return null;
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: 'jwt',
    },

    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },

    pages: {
        signIn: '/auth/signin',
    },

    callbacks: {
        session: async ({ session, token }) => {
            if (token) {
                session.user.id = token.id;
                session.user.userType = token.userType;
                session.user.email = token.email;
                session.user.surname = token.surname;
            }

            return session;
        },
        // @ts-expect-error
        jwt: async ({ token, user }: { token: JWT; user: AuthorizeReturnUserType }) => {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.userType = user.userType as AccountType;
                token.surname = user.surname;
            }

            return token;
        },
    },

    events: {},
    debug: true,
};
export default NextAuth(nextAuthOptions);
