import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductoDTO } from '../../clases/producto.dto';
import { BodegaDTO } from '../../../Bodega/clases/bodega.dto';

@Component({
  selector: 'app-producto-table',
  templateUrl: './producto-table.component.html'
})
export class ProductoTableComponent {
  @Input() productos: ProductoDTO[] = [];
  @Input() bodegas: BodegaDTO[] = [];
  @Input() isLoading: boolean = false;
  @Input() totalRecords: number = 0; 
  @Input() rows: number = 10;    

  @Output() editClicked = new EventEmitter<ProductoDTO>();
  @Output() deleteClicked = new EventEmitter<ProductoDTO>();
  @Output() lazyLoad = new EventEmitter<any>();
  @Output() filterChanged = new EventEmitter<{value: any, field: string, dt?: any}>();

  public onLazyLoad(event: any): void {
    this.lazyLoad.emit(event);
  }

  public onFilter(event: any, field: string, dt?: any): void {
    const value = event.target ? event.target.value : event.value;
    this.filterChanged.emit({ value, field, dt });
  }

  public onFilterDate(event: Date | null, field: string, dt?: any): void {
    const value = event ? event.toISOString() : null;
    this.filterChanged.emit({ value, field, dt });
  }

  public onSearchInput(event: any, dt: any): void {
    const value = event.target ? event.target.value : event.value;
    if (value === '') {
      this.onFilter(event, 'nombre', dt);
    }
  }

  public asignarEdicion(producto: ProductoDTO): void {
    this.editClicked.emit(producto);
  }

  public asignarEliminacion(producto: ProductoDTO): void {
    this.deleteClicked.emit(producto);
  }
}
