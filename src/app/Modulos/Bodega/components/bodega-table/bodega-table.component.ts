import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BodegaDTO } from '../../clases/bodega.dto';

@Component({
  selector: 'app-bodega-table',
  templateUrl: './bodega-table.component.html'
})
export class BodegaTableComponent {
  @Input() bodegas: BodegaDTO[] = [];
  @Input() isLoading: boolean = false;
  @Input() totalRecords: number = 0; 
  @Input() rows: number = 10;    

  @Output() editClicked = new EventEmitter<BodegaDTO>();
  @Output() deleteClicked = new EventEmitter<BodegaDTO>();
  @Output() lazyLoad = new EventEmitter<any>();
  @Output() filterChanged = new EventEmitter<{value: any, field: string, dt?: any}>();

  public onLazyLoad(event: any): void {
    this.lazyLoad.emit(event);
  }

  public onFilter(event: any, field: string, dt?: any): void {
    const value = event.target ? event.target.value : event.value;
    this.filterChanged.emit({ value, field, dt });
  }

  public onSearchInput(event: any, dt: any): void {
    const value = event.target ? event.target.value : event.value;
    if (value === '') {
      this.onFilter(event, 'nombre', dt);
    }
  }

  public asignarEdicion(bodega: BodegaDTO): void {
    this.editClicked.emit(bodega);
  }

  public asignarEliminacion(bodega: BodegaDTO): void {
    this.deleteClicked.emit(bodega);
  }
}
