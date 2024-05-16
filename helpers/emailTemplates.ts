export const changePasswordTemplate = `<div>Hasło zostało zmienione</div>`;

export const sendEmailResetPasswordTemplate = (encodedSecretKey: string) =>
    `<div><a href="${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${encodedSecretKey}">Resetuj hasło</a></div>`;

export const resetPasswordTemplate = (newPassword: string) => `<div>Kod: ${newPassword}</div>`;
