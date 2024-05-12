import React, { Dispatch, SetStateAction } from 'react';
import { DOTS, usePagination } from 'hooks/admin/usePagination';
import { isNaN } from 'lodash';
import { BtnContainer, ChangePageBtn, Container, PageNumber } from './styles/styles';

interface PaginationProps {
    currentPage: number;
    totalCount: number;
    rowsPerPage: number;
    siblingCount?: number;
    onPageChange?: (pageNumber: number) => void;
    setRowsPerPage?: Dispatch<SetStateAction<number>>;
}

export const ROWS_PER_PAGE = [5, 10, 25, 50, 100, 250, 500, 1000];

const Pagination: React.FC<PaginationProps> = ({
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    rowsPerPage,
    setRowsPerPage,
}) => {
    const paginationRange: (number | string)[] = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize: rowsPerPage,
    });
    const lastPage: number = parseInt(String(paginationRange[paginationRange.length - 1]), 10);

    const onNext = () => {
        onPageChange?.(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange?.(currentPage - 1);
    };

    const onChangeRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage?.(Number(e.target.value));
    };

    return (
        <Container>
            <label htmlFor="rows-per-page">Rows per page:</label>
            <select id="rows-per-page" value={rowsPerPage} onChange={onChangeRowsPerPage}>
                {ROWS_PER_PAGE.map((value) => (
                    <option key={value}>{value}</option>
                ))}
            </select>
            {totalCount ? (
                <>
                    <BtnContainer>
                        {currentPage !== 1 && <ChangePageBtn onClick={onPrevious}>{'<'}</ChangePageBtn>}
                    </BtnContainer>
                    {paginationRange.map((pageNumber, index) => {
                        if (pageNumber === DOTS) {
                            return (
                                <BtnContainer style={{ width: '25px' }} key={index}>
                                    {DOTS}
                                </BtnContainer>
                            );
                        }
                        return (
                            <PageNumber
                                key={index}
                                onClick={() => onPageChange?.(pageNumber as number)}
                                $currentPage={currentPage === pageNumber}
                            >
                                {pageNumber}
                            </PageNumber>
                        );
                    })}
                    <BtnContainer>
                        {!isNaN(lastPage) && currentPage !== lastPage && (
                            <ChangePageBtn onClick={onNext}>{'>'}</ChangePageBtn>
                        )}
                    </BtnContainer>
                </>
            ) : (
                <>
                    <ChangePageBtn>{'<'}</ChangePageBtn>
                    {[1, 2, 3, 4, 5, 6, 7].map((index) => {
                        return <PageNumber key={index}>...</PageNumber>;
                    })}
                    <ChangePageBtn>{'>'}</ChangePageBtn>
                </>
            )}
        </Container>
    );
};

export default Pagination;
