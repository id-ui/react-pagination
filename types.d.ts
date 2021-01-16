import * as React from 'react';

type VoidFunction = (...args: any[]) => void;

export interface PaginationProps {
    /**
     * count of visible pages in the center of pagination
     * @default 3
     */
    visiblePagesCount?: number;
    /**
     * count of pages
     */
    pagesCount: number;
    /**
     * active page
     * @default 1
     */
    currentPage?: number;
    /**
     * event, fired when page changed
     */
    onChangePage?: (page: number) => void;
    /**
     * function, that should return rendered left control, prop onClick leads to previous page
     */
    renderLeftControl?: ({ isDisabled: boolean, onClick: VoidFunction }) => React.ReactChild;
    /**
     * function, that should return rendered right control, prop onClick leads to next page
     */
    renderRightControl?: ({ isDisabled: boolean, onClick: VoidFunction }) => React.ReactChild;
    /**
     * function, that should return rendered page, prop onClick leads to this page
     * @default ({ number, ...props }) => <span {...props}>{number}</span>
     */
    renderPage?: ({ key: number, number: number, isActive: boolean, onClick: VoidFunction }) => React.ReactChild;
    /**
     * page groups divider
     * @default '...'
     */
    pageGroupsDivider?: React.ReactChild;
}

export default class Pagination extends React.Component<PaginationProps> {}