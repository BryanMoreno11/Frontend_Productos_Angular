export interface ColumnHeader {
    field: string;
    header?: string;
    hidden?: () => boolean;
}
