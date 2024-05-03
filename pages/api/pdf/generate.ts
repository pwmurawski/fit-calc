import { uuid } from 'uuidv4';
import { AuthenticatedApiRequest, HttpStatusCode } from '../../../lib/api/types';
import { NextApiResponse } from 'next/types';
import { withAuthMethodsAware } from 'lib/api/with-auth-methods-aware';
import { generatePdf, generatedPdf, getSummaryPdfData } from 'lib/api/query/pdf';
import { BodyGeneratePdf, PdfType, ResponseGeneratePdf } from 'types/pdf';
import { ApiError } from 'next/dist/server/api-utils';

interface Query {
    token: string;
}

const GET = async (req: AuthenticatedApiRequest<Query, BodyGeneratePdf>, res: NextApiResponse<ResponseGeneratePdf>) => {
    const userId = req.session.user.id;
    const { token } = req.query;

    const pdfData = await generatedPdf(token);
    switch (pdfData.action) {
        case PdfType.Summary:
            const pdfData = await getSummaryPdfData(userId, token);
            res.status(HttpStatusCode.OK).json({ pdfData });
            break;
        default:
            throw new ApiError(HttpStatusCode.Forbidden, 'Nie poprawny typ pdfa!');
    }
};

const POST = async (req: AuthenticatedApiRequest<void, BodyGeneratePdf>, res: NextApiResponse<Buffer>) => {
    const tokenExpirationDate = new Date();
    tokenExpirationDate.setHours(tokenExpirationDate.getHours() + 1);

    const { action, date } = req.body;
    const token = uuid();
    if (!token) {
        res.status(HttpStatusCode.NotFound);
        return;
    }

    const pdf = await generatePdf(token, tokenExpirationDate, action, date, req.cookies);
    res.status(HttpStatusCode.OK).setHeader('Content-Type', 'application/pdf').send(pdf);
};

export default withAuthMethodsAware({
    GET,
    POST,
});
