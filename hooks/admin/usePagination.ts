import { useMemo } from 'react';

export const DOTS: string = '...';

const range = (start: number, end: number): number[] => {
    let length: number = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

interface PaginationProps {
    totalCount: number;
    pageSize: number;
    siblingCount?: number;
    currentPage: number;
}

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
}: PaginationProps): (number | string)[] => {
    const paginationRange: (number | string)[] = useMemo(() => {
        const totalPageCount: number = Math.ceil(totalCount / pageSize);
        const totalPageNumbers: number = siblingCount + 5;

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex: number = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex: number = Math.min(currentPage + siblingCount, totalPageCount);
        const shouldShowLeftDots: boolean = leftSiblingIndex > 2;
        const shouldShowRightDots: boolean = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex: number = 1;
        const lastPageIndex: number = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount: number = 3 + 2 * siblingCount;
            let leftRange: number[] = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount: number = 3 + 2 * siblingCount;
            let rightRange: number[] = range(totalPageCount - rightItemCount + 1, totalPageCount);
            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange: number[] = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }

        return [];
    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
};
