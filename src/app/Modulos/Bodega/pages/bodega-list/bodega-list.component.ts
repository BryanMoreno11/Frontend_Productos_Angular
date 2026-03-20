import { Component, OnInit } from '@angular/core';
import { BodegaDTO } from '../../clases/bodega.dto';
import { BodegaService } from '../../services/bodega.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorHandler } from 'src/app/shared/pagination/paginationHandler';

@Component({
    selector: 'app-bodega-list',
    templateUrl: './bodega-list.component.html',
})
export class BodegaListComponent implements OnInit {
    public bodegas: BodegaDTO[] = [];
    public isLoading: boolean = false;
    public displayModal: boolean = false;
    public bodegaSeleccionada: BodegaDTO | null = null;
    public isSaving: boolean = false;

    public paginator = new PaginatorHandler<BodegaDTO>((query) =>
        this.bodegaService.getBodegasPaginados(query),
    );

    constructor(
        private bodegaService: BodegaService,
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

    public setAbrirModal(bodega: BodegaDTO | null = null): void {
        this.bodegaSeleccionada = bodega;
        this.displayModal = true;
    }

    public setCerrarModal(): void {
        console.log('Cerrando modal y reseteando estado');
        this.displayModal = false;
        this.bodegaSeleccionada = null;
    }

    public async setGuardarBodega(bodega: BodegaDTO): Promise<void> {
        this.isSaving = true;
        try {
            if (this.bodegaSeleccionada?.id) {
                await this.bodegaService.modificarBodega(
                    this.bodegaSeleccionada.id,
                    bodega,
                );
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Bodega actualizada correctamente',
                });
            } else {
                await this.bodegaService.crearBodega(bodega);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Bodega creada correctamente',
                });
            }
            this.setCerrarModal();
            this.paginator.reload(); // Refrescar lista
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Hubo un problema al guardar la bodega',
            });
            debugger;
        } finally {
            this.isSaving = false;
        }
    }

    public setConfirmarEliminacion(bodega: BodegaDTO): void {
        this.confirmationService.confirm({
            message: `¿Estás seguro de que deseas eliminar la bodega "${bodega.nombre}"?`,
            header: 'Confirmar Eliminación',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.setEliminarBodega(bodega.id);
            },
        });
    }

    private async setEliminarBodega(id: string): Promise<void> {
        try {
            await this.bodegaService.eliminarBodega(id);
            this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Bodega eliminada correctamente',
            });
            this.paginator.reload();
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Hubo un problema al eliminar la bodega',
            });
            debugger;
        }
    }
}
