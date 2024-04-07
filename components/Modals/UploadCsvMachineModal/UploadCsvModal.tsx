import { FC, useState } from 'react';
import { CSVUpload } from '../CSVUpload/CSVUpload';
import { Modal } from 'components/Modal/Modal';
import { ActionContainer, Button, Container, Title } from './styles/styles';
import { csvToArray } from 'helpers/csvToArray';
import { Column, Table } from 'components/Table/Table';
import { checkExistFoodProducts, importFoodProducts } from '_api/foodProducts';
import { isBoolean } from 'lodash';
import { Verified } from 'components/Verified/Verified';
import { stringToBool } from 'helpers/stringToBool';
import { useSWRConfig } from 'swr';
import { Action, ImportFoodProductAdmin } from 'types/FoodProduct';
import { useLoading } from 'hooks/useLoading';
import { toastError } from 'lib/custom-toasts/toast-error';
import { toastSucces } from 'lib/custom-toasts/toast-succes';

interface UploadModalProps {
    onClose: () => void;
    isBlocked: boolean;
}

const columns = {
    action: 'Akcja',
    name: 'Nazwa',
    kcal: 'Kalorie',
    protein: 'Białko',
    fat: 'Tłuszcz',
    carbs: 'Weglowodany',
    code: 'Kod',
    verifiedFoodProduct: 'Verified',
    blockedFoodProduct: 'Blocked',
    user: 'Email',
};

const headers = [
    'id',
    'name',
    'kcal',
    'protein',
    'fat',
    'carbs',
    'code',
    'verifiedFoodProduct',
    'blockedFoodProduct',
    'user',
];

export const UploadCsvModal: FC<UploadModalProps> = ({ onClose, isBlocked }) => {
    const [uploaded, setUploaded] = useState<ImportFoodProductAdmin>();
    const { mutate } = useSWRConfig();
    const { setLoading } = useLoading();

    const handleClose = () => {
        setUploaded(undefined);
        onClose();
    };

    const handleConfirm = async () => {
        if (uploaded) {
            setLoading(true);
            const res = await importFoodProducts(uploaded);

            if (res?.status === 'OK') {
                if (isBlocked) {
                    await mutate(`/admin/foodProducts/blocked`);
                    mutate(`/admin/foodProducts`, undefined);
                } else {
                    await mutate(`/admin/foodProducts`);
                    mutate(`/admin/foodProducts/blocked`, undefined);
                }
                toastSucces('Dane zostały zaimportowane!');
                onClose();
            }
            if (res?.status === 'ERROR') {
                toastError(res.error);
            }
            setLoading(false);
        }
    };

    const onUploadFile = async (file: File) => {
        setLoading(true);
        const fileData = await file?.text();
        const data = csvToArray(fileData, headers) as ImportFoodProductAdmin;
        const ids = [...new Set(data.map(({ id }) => id))];

        const res = await checkExistFoodProducts(ids);
        if (res?.status === 'OK') {
            const idsChecked = res.ids;
            setUploaded(data.map((el) => ({ ...el, action: idsChecked[el.id] ? Action.Edit : Action.Create })));
        }
        setLoading(false);
    };

    const rowRender = (el: any, column: Column<string>) => (
        <tr
            key={el.id}
            style={{
                backgroundColor: el.action === Action.Create ? '#baffe5' : '#feffd9',
                cursor: 'pointer',
            }}
        >
            {Object.keys(column).map((head) => (
                <td style={{ borderTop: '1px solid gray' }} key={head}>
                    {isBoolean(
                        ['true', 'false'].includes(String(el[head]).toLowerCase()) ? stringToBool(el[head]) : el[head],
                    ) ? (
                        <Verified verified={stringToBool(el[head])} />
                    ) : (
                        el[head]
                    )}
                </td>
            ))}
        </tr>
    );

    return (
        <Modal onClick={handleClose}>
            <Container
                onClick={(e) => {
                    e.stopPropagation();
                }}
                $maxWidth={!uploaded}
            >
                {uploaded && (
                    <Table
                        data={uploaded}
                        column={columns}
                        rowRender={rowRender}
                        header={<Title>{!uploaded ? 'Prześlij plik' : 'Przesłany plik'}</Title>}
                        buttons={
                            <ActionContainer>
                                <Button onClick={handleClose}>Anuluj</Button>
                                <Button onClick={handleConfirm}>Potwierdź</Button>
                            </ActionContainer>
                        }
                    />
                )}
                {!uploaded && <CSVUpload onUploadFile={onUploadFile} />}
            </Container>
        </Modal>
    );
};
