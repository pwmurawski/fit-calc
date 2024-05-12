import { exportFoodProducts } from '_api/foodProducts';
import { UploadCsvModal } from 'components/Modals/UploadCsvMachineModal/UploadCsvModal';
import fileDownload from 'js-file-download';
import { toastSucces } from 'lib/custom-toasts/toast-succes';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Button, Container, HeaderButtonContainer, Title } from './styles/styles';

interface AdminFoodTableHeaderProps {
    currentPage?: number;
    rowsPerPage?: number;
    isBlocked: boolean;
    setIsBlocked: Dispatch<SetStateAction<boolean>>;
}

export const AdminFoodTableHeader: FC<AdminFoodTableHeaderProps> = ({
    currentPage,
    rowsPerPage,
    isBlocked,
    setIsBlocked,
}) => {
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
            <Container>
                <Title>{!isBlocked ? 'Produkty' : 'Produkty - Archiwum'}</Title>
                <HeaderButtonContainer>
                    <Button onClick={handleExport}>Export</Button>
                    <Button onClick={handleImport}>Import</Button>
                    <Button onClick={handleArchive}>{!isBlocked ? 'Archiwum' : 'Aktywne'}</Button>
                </HeaderButtonContainer>
            </Container>
            {importModal && (
                <UploadCsvModal
                    onClose={closeImportModal}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    isBlocked={isBlocked}
                />
            )}
        </>
    );
};
