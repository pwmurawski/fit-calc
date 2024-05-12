import { Table, TableRowId } from 'components/Table/Table';
import { useEffect, useState } from 'react';
import { AdminFoodTableHeader } from './AdminFoodTableHeader';
import { AdminFoodTableButtons } from './AdminFoodTableButtons';
import { useAllFoodProducts } from 'hooks/admin/useAllFoodProducts';
import { TableContainer } from './styles/styles';
import Pagination, { ROWS_PER_PAGE } from 'components/Pagination/Pagination';
import { clearCache } from 'helpers/clearCache';
import { useSWRConfig } from 'swr';

const columns = {
    name: 'Nazwa',
    kcal: 'Kalorie',
    protein: 'Białko',
    fat: 'Tłuszcz',
    carbs: 'Weglowodany',
    code: 'Kod',
    verifiedFoodProduct: 'Verified',
};

export const AdminFoodTable = () => {
    const { cache } = useSWRConfig();
    const [selectedRowId, setSelectedRowId] = useState<TableRowId>();
    const [isBlocked, setIsBlocked] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(ROWS_PER_PAGE[4]);
    const data = useAllFoodProducts(currentPage, rowsPerPage, isBlocked);

    useEffect(() => {
        setCurrentPage(1);
        setSelectedRowId(undefined);
    }, [isBlocked]);

    useEffect(() => {
        setCurrentPage(1);
        clearCache(cache, '/admin/foodProducts');
    }, [rowsPerPage]);

    useEffect(() => {
        setSelectedRowId(undefined);
    }, [currentPage, rowsPerPage]);

    return (
        <TableContainer>
            <Table
                data={data?.foodProducts ?? []}
                column={columns}
                selectedRowId={selectedRowId}
                setSelectedRowId={setSelectedRowId}
                header={
                    <AdminFoodTableHeader
                        currentPage={currentPage}
                        rowsPerPage={rowsPerPage}
                        isBlocked={isBlocked}
                        setIsBlocked={setIsBlocked}
                    />
                }
                buttons={
                    <AdminFoodTableButtons
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
        </TableContainer>
    );
};
