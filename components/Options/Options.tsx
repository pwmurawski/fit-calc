import { Button, Container } from './styles/styles';
import EditSvg from '../Svg/EditSvg';
import { VerifiedSvg } from 'components/Svg/VerifiedSvg';
import { DeleteSvg } from 'components/Svg/DeleteSvg';
import Link from 'next/link';
import { useState } from 'react';
import { DeleteFoodProductModal } from 'components/Modals/DeleteFoodProductModal/DeleteFoodProductModal';

interface IEditBtnProps {
    verifiedFoodProduct: boolean;
    ids: {
        productId: string;
        productUserId?: string;
        userAuthId?: string;
    };
}

export default function Options({ verifiedFoodProduct, ids: { productId, productUserId, userAuthId } }: IEditBtnProps) {
    const [isDelete, setIsDelete] = useState<boolean>(false);

    const onOpenDeleteModal = () => {
        setIsDelete(true);
    };

    const onCloseDeleteModal = () => {
        setIsDelete(false);
    };

    return (
        <Container>
            {verifiedFoodProduct ? (
                <VerifiedSvg />
            ) : (
                productUserId === userAuthId && (
                    <>
                        <Link href={`/foodProducts/edit/${productId}`}>
                            <EditSvg />
                        </Link>
                        <Button onClick={onOpenDeleteModal}>
                            <DeleteSvg />
                        </Button>
                    </>
                )
            )}
            {isDelete && <DeleteFoodProductModal onClose={onCloseDeleteModal} productId={productId} />}
        </Container>
    );
}
