import { Component, OnInit } from '@angular/core';
import { ProductoDTO } from '../../clases/producto.dto';
import { ProductoService } from '../../services/producto.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorHandler } from 'src/app/shared/pagination/paginationHandler';

@Component({
    selector: 'app-producto-list',
    templateUrl: './producto-list.component.html',
})
export class ProductoListComponent implements OnInit {
    public productos: ProductoDTO[] = [];
    public isLoading: boolean = false;
    public displayModal: boolean = false;
    public productoSeleccionado: ProductoDTO | null = null;
    public isSaving: boolean = false;

    public paginator = new PaginatorHandler<ProductoDTO>((query) =>
        this.productoService.getProductosPaginados(query),
    );

    constructor(
        private productoService: ProductoService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) {}

    ngOnInit(): void {
        this.paginator.init();
    }

    public onTableLazyLoad(event: any) {
        this.paginator.next(event);
    }

    public onTableFilter(event: any) {
        this.paginator.onFilter(event.value, event.field, undefined, event.dt);
    }

    public setAbrirModal(producto: ProductoDTO | null = null): void {
        this.productoSeleccionado = producto;
        this.displayModal = true;
    }

    public setCerrarModal(): void {
        console.log('Cerrando modal y reseteando estado');
        this.displayModal = false;
        this.productoSeleccionado = null;
    }

    public async setGuardarProducto(producto: ProductoDTO): Promise<void> {
        this.isSaving = true;
        try {
            if (this.productoSeleccionado?.id) {
                await this.productoService.modificarProducto(
                    this.productoSeleccionado.id,
                    producto,
                );
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Producto actualizado correctamente',
                });
            } else {
                await this.productoService.crearProducto(producto);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Producto creado correctamente',
                });
            }
            this.setCerrarModal();
            this.paginator.reload(); // Refrescar lista
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Hubo un problema al guardar el producto',
            });
            debugger;
        } finally {
            this.isSaving = false;
        }
    }

    public setConfirmarEliminacion(producto: ProductoDTO): void {
        this.confirmationService.confirm({
            message: `¿Estás seguro de que deseas eliminar el producto "${producto.nombre}"?`,
            header: 'Confirmar Eliminación',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.setEliminarProducto(producto.id);
            },
        });
    }

    private async setEliminarProducto(id: string): Promise<void> {
        try {
            await this.productoService.eliminarProducto(id);
            this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Producto eliminado correctamente',
            });
            this.paginator.reload();
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Hubo un problema al eliminar el producto',
            });
            debugger;
        }
    }
}
