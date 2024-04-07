export const objectToCsv = <T extends object>(
    data: T[],
    headersMap: {
        title: string;
        name: string;
    }[],
) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    const translatedHeaders = headers.map((header) => {
        return headersMap.find((headerMap) => headerMap.title === header)?.name;
    });
    csvRows.push(translatedHeaders.join(';'));

    for (const row of data) {
        const values = headers.map((header) => {
            const val = row[header as keyof T];
            return `${val}`;
        });

        csvRows.push(values.join(';'));
    }

    return csvRows.join('\n');
};
