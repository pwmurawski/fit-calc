import { Verified } from 'components/Verified/Verified';
import { isBoolean } from 'lodash';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export type TableRowId = string | number | null | undefined;
type Keys<Col> = keyof Col;
type Column<Col> = Record<Keys<Col>, TableRowId>;

interface TableProps<Col, Data> {
    data: Data;
    column: Column<Col>;
    selectedRowId?: TableRowId;
    setSelectedRowId: Dispatch<SetStateAction<TableRowId>>;
    header?: ReactNode;
    buttons?: ReactNode;
}

export const Table = <Col extends { [x: string]: TableRowId }, Data extends { [x: string]: any }[]>({
    data,
    column,
    selectedRowId,
    setSelectedRowId,
    header,
    buttons,
}: TableProps<Col, Data>) => {
    return (
        <section style={{ border: '1px solid gray', borderRadius: '5px', margin: '20px' }}>
            {header}
            <table width="100%" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {Object.values(column).map((head) => (
                            <th key={head}>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                    {data.map((el) => (
                        <tr
                            key={el.id}
                            onClick={() => {
                                if (el.id === selectedRowId) {
                                    setSelectedRowId(undefined);
                                } else {
                                    setSelectedRowId(el.id);
                                }
                            }}
                            style={{
                                backgroundColor: el.id === selectedRowId ? '#ddedff' : undefined,
                                cursor: 'pointer',
                            }}
                        >
                            {Object.keys(column).map((head) => (
                                <td style={{ borderTop: '1px solid gray' }} key={head}>
                                    {isBoolean(el[head]) ? <Verified verified={el[head]} /> : el[head]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {buttons}
        </section>
    );
};
