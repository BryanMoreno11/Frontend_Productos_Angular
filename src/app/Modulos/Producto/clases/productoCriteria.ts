export interface productoCriteria {
    nombre?: string;
    stockMinimo?: number;
    fechaIngresoHasta?: string;
    bodegaId?: number;
    page: number;
    pageSize: number;
}

export enum ProductoFilterFields {
    Nombre = 'nombre',
    StockMinimo = 'stockMinimo',
    FechaIngresoHasta = 'fechaIngresoHasta',
    BodegaId = 'bodegaId'
}