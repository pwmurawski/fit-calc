import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface User extends AdapterUser {
    id: string;
    name: string;
    surname: string;
    email: string;
    userType: AccountType;
}

/** Example on how to extend the built-in session types */
declare module 'next-auth' {
    interface Session {
        /** This is an example. You can find me in types/next-auth.d.ts */
        id: string;
        foo: string;
        user: User;
    }
}

/** Example on how to extend the built-in types for JWT */
declare module 'next-auth/jwt' {
    interface JWT {
        /** This is an example. You can find me in types/next-auth.d.ts */
        id: string;
        bar: number;
        surname: string;
        email: string;
        userType: AccountType;
    }
}
