import { Component, OnInit } from '@angular/core';
import { ProductoDTO } from '../../clases/producto.dto';
import { ProductoService } from '../../services/producto.service';

@Component({
    selector: 'app-producto-list',
    templateUrl: './producto-list.component.html',
})
export class ProductoListComponent implements OnInit {
    public productos: ProductoDTO[] = [];
    public isLoading: boolean = false;

    public permissions = {
        agregar: 'RastroProductos.Agregar',
        verTabla: 'RastroProductos.VerTabla',
    };

    constructor(private productoService: ProductoService) {}

    ngOnInit(): void {
        this.asignarListaProductos();
    }

    public async asignarListaProductos(): Promise<void> {
        this.isLoading = true;
        try {
            this.productos = await this.productoService.getProductos();
        } catch (error) {
            debugger;
        } finally {
            this.isLoading = false;
        }
    }

    public setAccionProducto(producto: ProductoDTO): void {
        debugger;
    }
}
