import Loading from 'components/Loading/Loading';
import { Table, TableRowId } from 'components/Table/Table';
import { useUsers } from 'hooks/admin/useUsers';
import { useState } from 'react';
import { UsersTableHeader } from './UsersTableHeader';
import { UsersTableButtons } from './UsersTableButtons';

const column = {
    name: 'Imie',
    surname: 'Nazwisko',
    email: 'Email',
    userType: 'Typ konta',
};

export const UesrsTable = () => {
    const users = useUsers();
    const [selectedRowId, setSelectedRowId] = useState<TableRowId>();

    if (!users?.length) {
        return <Loading />;
    }
    return (
        <Table
            data={users}
            column={column}
            selectedRowId={selectedRowId}
            setSelectedRowId={setSelectedRowId}
            header={<UsersTableHeader />}
            buttons={<UsersTableButtons selectedRowId={selectedRowId} />}
        />
    );
};
