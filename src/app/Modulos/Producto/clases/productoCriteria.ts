export interface productoCriteria {
    nombre?: string;
    stockMinimo?: number;
    fechaIngresoHasta?: string;
    bodegaId?: number;
    page: number;
    pageSize: number;
}
