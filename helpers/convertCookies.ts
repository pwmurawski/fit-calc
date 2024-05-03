export const convertCookies = (cookies: Partial<{ [key: string]: string }>, url: string) => {
    const cookiesArray = [];
    for (const [name, value] of Object.entries(cookies)) {
        cookiesArray.push({ name, value: String(value), url });
    }
    return cookiesArray;
};
