import { exportFoodProducts } from '_api/foodProducts';
import { UploadCsvModal } from 'components/Modals/UploadCsvMachineModal/UploadCsvModal';
import fileDownload from 'js-file-download';
import { toastSucces } from 'lib/custom-toasts/toast-succes';
import { Dispatch, FC, SetStateAction, useState } from 'react';

interface AdminFoodTableHeaderProps {
    isBlocked: boolean;
    setIsBlocked: Dispatch<SetStateAction<boolean>>;
}

export const AdminFoodTableHeader: FC<AdminFoodTableHeaderProps> = ({ isBlocked, setIsBlocked }) => {
    const [importModal, setImportModal] = useState(false);

    const handleExport = async () => {
        const res = await exportFoodProducts();

        if (res?.status === 'OK') {
            fileDownload(res.csv, 'FoodProducts' + '.csv', 'text/csv;charset=utf-8', '\uFEFF');
            toastSucces('Dane zostały wyeksportowane!');
        }
    };

    const handleImport = async () => {
        openImportModal();
    };

    const handleArchive = () => {
        setIsBlocked(!isBlocked);
    };

    const openImportModal = () => setImportModal(true);
    const closeImportModal = () => setImportModal(false);

    return (
        <>
            <section style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2 style={{ margin: '20px' }}>{!isBlocked ? 'Produkty' : 'Produkty - Archiwum'}</h2>
                <div>
                    <button onClick={handleExport}>Export</button>
                    <button onClick={handleImport}>Import</button>
                    <button onClick={handleArchive}>{!isBlocked ? 'Archiwum' : 'Aktywne'}</button>
                </div>
            </section>
            {importModal && <UploadCsvModal onClose={closeImportModal} isBlocked={isBlocked} />}
        </>
    );
};
