import { Table, TableRowId } from 'components/Table/Table';
import { useEffect, useState } from 'react';
import Pagination, { ROWS_PER_PAGE } from 'components/Pagination/Pagination';
import { useLogs } from 'hooks/admin/useLogs';
import { LogsTableHeader } from './LogsTableHeader';

const column = {
    dateTime: 'Data',
    email: 'Email',
    log: 'Info',
};

export const LogsTable = () => {
    const [selectedRowId, setSelectedRowId] = useState<TableRowId>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(ROWS_PER_PAGE[4]);
    const data = useLogs(currentPage, rowsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [rowsPerPage]);

    useEffect(() => {
        setSelectedRowId(undefined);
    }, [currentPage, rowsPerPage]);

    return (
        <>
            <Table
                data={data?.logs ?? []}
                column={column}
                selectedRowId={selectedRowId}
                setSelectedRowId={setSelectedRowId}
                header={<LogsTableHeader />}
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
