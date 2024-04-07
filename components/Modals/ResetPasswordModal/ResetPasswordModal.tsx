import { FC } from 'react';
import { DecisionModal } from '../DecisionModal/DecisionModal';
import { TableRowId } from 'components/Table/Table';
import { resetPassword } from '_api/users';
import { toastSucces } from 'lib/custom-toasts/toast-succes';
import { toastError } from 'lib/custom-toasts/toast-error';

interface ResetPasswordModalProps {
    onClose: () => void;
    selectedRowId: TableRowId;
}

export const ResetPasswordModal: FC<ResetPasswordModalProps> = ({ onClose, selectedRowId }) => {
    const handleCancel = () => {
        onClose();
    };

    const handleAccept = async () => {
        const res = await resetPassword(String(selectedRowId));

        if (res?.status === 'OK') {
            toastSucces('Hasło zostało zresetowne!');
        }
        if (res?.status === 'ERROR') {
            console.log(res.error);
            toastError('Hasło nie zostało zresetowne!');
        }
        onClose();
    };

    return (
        <DecisionModal
            title="Reset hasła"
            desc="Czy napewno chcesz zresetować hasło?"
            handleAccept={handleAccept}
            onClose={handleCancel}
        />
    );
};
