import { unstable_getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { nextAuthOptions } from 'pages/api/auth/[...nextauth]';

export const getServerSession = async (req: NextApiRequest, res: NextApiResponse) => {
    return await unstable_getServerSession(req, res, nextAuthOptions);
};
