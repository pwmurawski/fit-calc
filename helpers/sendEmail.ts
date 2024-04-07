import { HttpStatusCode } from 'axios';
import { ApiError } from 'next/dist/server/api-utils';
import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';

export const sendEmail = async (emails: string | string[], mailOptions: MailOptions) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const res = await transporter.sendMail({ ...mailOptions, to: emails });
        if (res.accepted) {
            return { message: 'Email został wysłany' };
        }
        return { message: 'Email nie został wysłany' };
    } catch (error) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Email nie został wysłany!');
    }
};
