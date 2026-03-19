import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProductoDTO } from '../clases/producto.dto';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductoService {
    private apiUrl = `${environment.apiUrl}/api/producto`;

    constructor(private http: HttpClient) {}

    public getProductos(): Promise<ProductoDTO[]> {
        // Retorna una Promesa usando firstValueFrom, reemplanzando observables puros
        return firstValueFrom(this.http.get<ProductoDTO[]>(this.apiUrl));
    }

    public getProducto(id: string): Promise<ProductoDTO> {
        return firstValueFrom(
            this.http.get<ProductoDTO>(`${this.apiUrl}/${id}`),
        );
    }

    public crearProducto(producto: ProductoDTO): Promise<any> {
        return firstValueFrom(
            this.http.post<any>(`${this.apiUrl}/crear-producto`, producto),
        );
    }

    public modificarProducto(id: string, producto: ProductoDTO): Promise<any> {
        return firstValueFrom(
            this.http.put<any>(
                `${this.apiUrl}/modificar-producto/${id}`,
                producto,
            ),
        );
    }

    public eliminarProducto(id: string): Promise<any> {
        return firstValueFrom(
            this.http.delete<any>(`${this.apiUrl}/eliminar-producto/${id}`),
        );
    }
}
