import { FC, useCallback } from 'react';
import { ErrorCode, FileError, FileRejection, useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import styled from 'styled-components';

interface FileUploadProps {
    onUploadFile: (file: File) => void;
}

const DropzoneBox = styled.div({
    position: 'relative',
    backgroundColor: 'background.paper',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '8px',
    alignItems: 'center',
    border: '1px dashed',
    borderRadius: '5px',
    margin: '30px 10px',
});

const TextBox = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const Title = styled.h3({
    margin: 0,
});

const Container = styled.section({
    padding: '20px',
});

export const CSVUpload: FC<FileUploadProps> = ({ onUploadFile }) => {
    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const file = acceptedFiles.map((file: File) =>
                Object.assign(file, {
                    src: URL.createObjectURL(file),
                }),
            )[0];

            if (file) {
                onUploadFile(file);
            }
        },
        [onUploadFile],
    );

    const onDropRejected = useCallback(async function (fileRejections: FileRejection[]) {
        fileRejections[0].errors.map((errorItem: FileError) => {
            switch (errorItem.code) {
                case ErrorCode.TooManyFiles:
                    toast.error('Proszę dodać tylko jeden plik');
                    break;
                default:
                    toast.error('Coś poszło nie tak przy dodawaniu pliku');
            }
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'text/csv': [
                '.csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values',
            ],
        },
        multiple: true,
        onDrop: onDrop,
        onDropRejected: onDropRejected,
    });

    return (
        <Container>
            <Title>Prześlij plik</Title>
            <DropzoneBox {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <TextBox>
                    <p>
                        <a>Kliknij by wgrać</a>
                    </p>
                    <p>lub przeciągnij i upuść</p>
                    <p>tylko .csv</p>
                </TextBox>
            </DropzoneBox>
        </Container>
    );
};
