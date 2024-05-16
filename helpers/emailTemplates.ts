export const changePasswordTemplate = `<div>Hasło zostało zmienione</div>`;

export const sendEmailResetPasswordTemplate = (encodedSecretKey: string) =>
    `<div><a href="http://localhost:3000/reset-password/${encodedSecretKey}">Resetuj hasło</a></div>`;

export const resetPasswordTemplate = (newPassword: string) => `<div>Kod: ${newPassword}</div>`;
