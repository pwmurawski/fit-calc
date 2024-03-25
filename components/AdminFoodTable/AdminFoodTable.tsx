import Loading from 'components/Loading/Loading';
import { Table, TableRowId } from 'components/Table/Table';
import { useEffect, useState } from 'react';
import { AdminFoodTableHeader } from './AdminFoodTableHeader';
import { AdminFoodTableButtons } from './AdminFoodTableButtons';
import { useAllFoodProducts } from 'hooks/admin/useAllFoodProducts';

const column = {
    name: 'Nazwa',
    kcal: 'Kalorie',
    protein: 'Białko',
    fat: 'Tłuszcz',
    carbs: 'Weglowodany',
    code: 'Kod',
    verifiedFoodProduct: 'Verified',
};

export const AdminFoodTable = () => {
    const [selectedRowId, setSelectedRowId] = useState<TableRowId>();
    const [isBlocked, setIsBlocked] = useState<boolean>(false);
    const foodProducts = useAllFoodProducts(isBlocked);

    useEffect(() => {
        setSelectedRowId(undefined);
    }, [isBlocked]);

    if (!foodProducts?.length) {
        return <Loading />;
    }
    return (
        <Table
            data={foodProducts}
            column={column}
            selectedRowId={selectedRowId}
            setSelectedRowId={setSelectedRowId}
            header={<AdminFoodTableHeader isBlocked={isBlocked} setIsBlocked={setIsBlocked} />}
            buttons={
                <AdminFoodTableButtons
                    selectedRowId={selectedRowId}
                    setSelectedRowId={setSelectedRowId}
                    isBlocked={isBlocked}
                />
            }
        />
    );
};
