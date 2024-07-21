import { Table, TableRowId } from 'components/Table/Table';
import { useUsers } from 'hooks/admin/useUsers';
import { useEffect, useState } from 'react';
import { UsersTableHeader } from './UsersTableHeader';
import Pagination, { ROWS_PER_PAGE } from 'components/Pagination/Pagination';
import { UsersTableButtons } from './UsersTableButtons';

const column = {
    name: 'Imie',
    surname: 'Nazwisko',
    email: 'Email',
    userType: 'Typ konta',
};

export const UesrsTable = () => {
    const [selectedRowId, setSelectedRowId] = useState<TableRowId>();
    const [isBlocked, setIsBlocked] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(ROWS_PER_PAGE[4]);
    const data = useUsers(currentPage, rowsPerPage, isBlocked);

    useEffect(() => {
        setCurrentPage(1);
        setSelectedRowId(undefined);
    }, [isBlocked]);

    useEffect(() => {
        setCurrentPage(1);
    }, [rowsPerPage]);

    useEffect(() => {
        setSelectedRowId(undefined);
    }, [currentPage, rowsPerPage]);

    return (
        <>
            <Table
                data={data?.users ?? []}
                column={column}
                selectedRowId={selectedRowId}
                setSelectedRowId={setSelectedRowId}
                header={<UsersTableHeader isBlocked={isBlocked} setIsBlocked={setIsBlocked} />}
                buttons={
                    <UsersTableButtons
                        selectedRowId={selectedRowId}
                        setSelectedRowId={setSelectedRowId}
                        currentPage={currentPage}
                        rowsPerPage={rowsPerPage}
                        isBlocked={isBlocked}
                    />
                }
                pagination={
                    <Pagination
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        totalCount={Number(data?.total)}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                    />
                }
            />
        </>
    );
};
