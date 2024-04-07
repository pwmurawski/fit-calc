import { User } from '@prisma/client';
import Image from 'next/image';
import { FC } from 'react';
import {
    Action,
    Button,
    Container,
    DataSection,
    FullNameContainer,
    Left,
    Name,
    Right,
    Title,
    Typography,
    UserType,
    UserTypeContainer,
} from './styles/styles';
import { AccountType } from 'types/enum';

interface ProfileCardProps {
    userData: Omit<User, 'password'> | undefined;
    isEdit: boolean;
    isChangePassword: boolean;
    onClickEditBtn: () => void;
    onClickChangePasswordBtn: () => void;
}

export const ProfileCard: FC<ProfileCardProps> = ({
    userData,
    isEdit,
    isChangePassword,
    onClickEditBtn,
    onClickChangePasswordBtn,
}) => {
    return (
        <>
            <Title>Profil</Title>
            <Container>
                <Left>
                    <Image src={'/assets/user.png'} width={150} height={150} alt="user" priority />
                    <DataSection>
                        <FullNameContainer>
                            <Name>{userData?.name}</Name>
                            <Name>{userData?.surname}</Name>
                        </FullNameContainer>
                        <Typography>{userData?.email}</Typography>
                    </DataSection>
                </Left>
                <Right>
                    <UserTypeContainer>
                        <UserType $isAdmin={userData?.userType === AccountType.Admin}>{userData?.userType}</UserType>
                    </UserTypeContainer>
                    <Action>
                        <Button $isSelected={isEdit} onClick={onClickEditBtn}>
                            Edytuj
                        </Button>
                        <Button $isSelected={isChangePassword} onClick={onClickChangePasswordBtn}>
                            Zmień hasło
                        </Button>
                    </Action>
                </Right>
            </Container>
        </>
    );
};
