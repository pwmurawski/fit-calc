import { User } from '@prisma/client';

export const userSeed: User[] = [
    //ADMIN
    {
        id: 'cld20gjwh00000u2cojyld4ko',
        name: 'Admin',
        surname: 'Admin',
        email: 'admin@email.com',
        password: '$2a$12$dNQFSjIUqgQ.7nqFD64xFO6xEQjJKHTfL1VXVLeJHUHo26J7Z8E.a',
        userType: 'ADMIN',
    },
    //STANDARD
    {
        id: 'clbuknbfv0000d68odecy9ue0',
        name: 'Paweł',
        surname: 'Murawski',
        email: 'pawel@email.com',
        password: '$2a$12$dNQFSjIUqgQ.7nqFD64xFO6xEQjJKHTfL1VXVLeJHUHo26J7Z8E.a',
        userType: 'STANDARD',
    },
];
