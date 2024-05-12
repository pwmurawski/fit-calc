import { Verified } from 'components/Verified/Verified';
import { isBoolean } from 'lodash';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Row } from './styles/styles';

export type TableRowId = string | number | null | undefined;
type Keys<Col> = keyof Col;
export type Column<Col> = Record<Keys<Col>, TableRowId>;

interface TableProps<Col, Data> {
    data: Data;
    column: Column<Col>;
    selectedRowId?: TableRowId;
    setSelectedRowId?: Dispatch<SetStateAction<TableRowId>>;
    header?: ReactNode;
    buttons?: ReactNode;
    pagination?: ReactNode;
    rowRender?: (el: { [x: string]: any }, column: Column<any>) => ReactNode;
}

export const Table = <Col extends { [x: string]: TableRowId }, Data extends { [x: string]: any }[]>({
    data,
    column,
    selectedRowId,
    setSelectedRowId,
    header,
    buttons,
    pagination,
    rowRender,
}: TableProps<Col, Data>) => {
    return (
        <section
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                border: '1px solid gray',
                borderRadius: '5px',
                backgroundColor: 'white',
                position: 'relative',
            }}
        >
            {header}
            <section style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'auto' }}>
                <table width="100%" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            {Object.values(column).map((head) => (
                                <th key={head}>{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        {data.length ? (
                            data.map((el) =>
                                rowRender ? (
                                    rowRender(el, column)
                                ) : (
                                    <Row
                                        key={el.id}
                                        onClick={() => {
                                            if (el.id === selectedRowId) {
                                                setSelectedRowId?.(undefined);
                                            } else {
                                                setSelectedRowId?.(el.id);
                                            }
                                        }}
                                        style={{
                                            backgroundColor: el.id === selectedRowId ? '#ddedff' : undefined,
                                        }}
                                    >
                                        {Object.keys(column).map((head) => (
                                            <td key={head}>
                                                {isBoolean(el[head]) ? <Verified verified={el[head]} /> : el[head]}
                                            </td>
                                        ))}
                                    </Row>
                                ),
                            )
                        ) : (
                            <tr
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <td> loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '5px',
                    gap: '5px',
                    borderTop: '1px solid gray',
                }}
            >
                {buttons}
                {pagination}
            </section>
        </section>
    );
};
