export interface ProductoDTO {
    id?: string;
    nombre: string;
    stock: number;
    precio: number;
    bodegaId: number;
    bodegaNombre?: string;
    fechaIngreso: string | Date;
}
