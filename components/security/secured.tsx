import { useAuth } from 'hooks/useAuth';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import Loading from 'components/Loading/Loading';

type UnmodifiablePropArray = string[];

interface SecuredProps {
    authorities: UnmodifiablePropArray;
    children?: React.ReactNode;
}

export const Secured: React.FC<SecuredProps> = ({ children, authorities }) => {
    const { session } = useAuth();
    const { push } = useRouter();

    if (!session || session.status === 'unauthenticated') {
        push('/login');
    }

    if (session.status === 'loading') {
        return <Loading stopClick />;
    }

    if (session.status === 'authenticated') {
        return (
            <Authorized authorities={authorities} user={session.data.user}>
                {children}
            </Authorized>
        );
    }
    return null;
};

interface IAuthorizedProps extends SecuredProps {
    user: Session['user'];
}

const Authorized: React.FC<IAuthorizedProps> = ({ user, authorities, children }) => {
    const router = useRouter();
    const isAuthorized = useMemo(() => {
        return authorities.includes(user.userType);
    }, [user.userType, router.asPath]);

    if (isAuthorized) return <>{children}</>;
    else {
        return null;
    }
};
