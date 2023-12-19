import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession as serverSession } from 'next-auth';
import { nextAuthOptions } from 'pages/api/auth/[...nextauth]';

export const getServerSession = async (req: NextApiRequest, res: NextApiResponse) => {
    return await serverSession(req, res, nextAuthOptions);
};
