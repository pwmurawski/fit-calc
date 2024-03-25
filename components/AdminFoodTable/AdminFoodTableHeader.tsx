import { Dispatch, FC, SetStateAction } from 'react';

interface AdminFoodTableHeaderProps {
    isBlocked: boolean;
    setIsBlocked: Dispatch<SetStateAction<boolean>>;
}

export const AdminFoodTableHeader: FC<AdminFoodTableHeaderProps> = ({ isBlocked, setIsBlocked }) => {
    return (
        <section style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ margin: '20px' }}>{!isBlocked ? 'Produkty' : 'Produkty - Archiwum'}</h2>
            <button onClick={() => setIsBlocked(!isBlocked)}>{!isBlocked ? 'Archiwum' : 'Aktywne'}</button>
        </section>
    );
};
