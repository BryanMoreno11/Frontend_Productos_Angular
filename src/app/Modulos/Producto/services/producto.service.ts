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
}
