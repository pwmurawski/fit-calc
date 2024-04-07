export const csvToArray = (str: string, headers: string[], delimiter = ';') => {
    // let headers = str.slice(0, str.indexOf('\n') - 1).split(delimiter);
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');

    const arr = rows.reduce<Record<string, string>[]>((result, row) => {
        if (row.trim() !== '') {
            const values = row.split(delimiter).map((value) => value.replace('\r', ''));
            const el = headers.reduce<Record<string, string>>((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            result.push(el);
        }
        return result;
    }, []);

    return arr;
};
