import axios from 'axios';
import { Response } from 'types/Response';
import { BodyGeneratePdf, ResponseGeneratePdf } from 'types/pdf';

export const getDataPdf = async (token: string): Response<ResponseGeneratePdf> => {
    try {
        const response = await axios.get<ResponseGeneratePdf>('/api/pdf/generate', { params: { token } });
        if (response.data.pdfData) {
            return { pdfData: response.data.pdfData, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response.data.error, status: 'ERROR' };
    }
};

export const generatePdf = async (body: BodyGeneratePdf): Response<{ pdf: Blob }> => {
    try {
        const response = await axios.post<Blob>('/api/pdf/generate', body, { responseType: 'blob' });
        if (response.data) {
            return { pdf: response.data, status: 'OK' };
        }
    } catch (error: any) {
        return { error: error.response.data.error, status: 'ERROR' };
    }
};
