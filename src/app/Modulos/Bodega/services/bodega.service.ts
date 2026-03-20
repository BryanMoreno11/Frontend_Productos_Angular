import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { BodegaDTO } from '../clases/bodega.dto';
import { environment } from '../../../../environments/environment';
import { PageList } from 'src/app/shared/pagination/pageList';

@Injectable({
    providedIn: 'root',
})
export class BodegaService {
    private apiUrl = `${environment.apiUrl}/api/bodega`;

    constructor(private http: HttpClient) {}

    public getBodegas(): Promise<BodegaDTO[]> {
        return firstValueFrom(this.http.get<BodegaDTO[]>(this.apiUrl));
    }

    public getBodegasPaginados(query: Record<string, any>): Promise<PageList<BodegaDTO>> {
        let params = new HttpParams();
        Object.keys(query).forEach(key => {
            if (query[key] !== null && query[key] !== undefined) {
                params = params.set(key, query[key].toString());
            }
        });
        return firstValueFrom(
            this.http.get<PageList<BodegaDTO>>(`${this.apiUrl}/listar-paginado`, { params })
        );
    }

    public getBodega(id: string): Promise<BodegaDTO> {
        return firstValueFrom(
            this.http.get<BodegaDTO>(`${this.apiUrl}/${id}`),
        );
    }

    public crearBodega(bodega: BodegaDTO): Promise<any> {
        return firstValueFrom(
            this.http.post<any>(`${this.apiUrl}/crear-bodega`, bodega),
        );
    }

    public modificarBodega(id: string, bodega: BodegaDTO): Promise<any> {
        return firstValueFrom(
            this.http.put<any>(
                `${this.apiUrl}/modificar-bodega/${id}`,
                bodega,
            ),
        );
    }

    public eliminarBodega(id: string): Promise<any> {
        return firstValueFrom(
            this.http.delete<any>(`${this.apiUrl}/eliminar-bodega/${id}`),
        );
    }
}
