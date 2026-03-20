export interface IPageList<T> {
    items: T[];
    totalItems: number;
    page?: number;
    pageSize?: number;
}

export class PageList<T> implements IPageList<T> {
    items: T[] = [];
    totalItems: number = 0;
    page: number = 1;
    pageSize: number = 10;
}
