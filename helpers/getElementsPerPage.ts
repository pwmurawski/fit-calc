import { PAGE_HEIGHT } from 'types/constants';

export const getElementsPerPage = (heights: number[]) => {
    let totalHeight = 0;
    let elementsOnPage = 0;
    let pageCount = [];

    for (let i = 0; i < heights.length; i++) {
        totalHeight += heights[i];
        elementsOnPage++;
        if (totalHeight > PAGE_HEIGHT) {
            pageCount.push(elementsOnPage - 1);
            totalHeight = heights[i];
            elementsOnPage = 1;
        }
    }

    if (elementsOnPage > 0) {
        pageCount.push(elementsOnPage);
    }

    for (let i = 1; i < pageCount.length; i++) {
        pageCount[i] += pageCount[i - 1];
    }
    pageCount.pop();

    return pageCount;
};
