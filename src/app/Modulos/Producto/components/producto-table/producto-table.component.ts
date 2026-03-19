import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductoDTO } from '../../clases/producto.dto';

@Component({
  selector: 'app-producto-table',
  templateUrl: './producto-table.component.html'
})
export class ProductoTableComponent {
  // Presentational/Dumb Component, solo recibe datos y emite eventos
  @Input() productos: ProductoDTO[] = [];
  @Input() isLoading: boolean = false;
  @Input() permissions: any;
  
  @Output() editClicked = new EventEmitter<ProductoDTO>();
  @Output() deleteClicked = new EventEmitter<ProductoDTO>();

  public asignarEdicion(producto: ProductoDTO): void {
    this.editClicked.emit(producto);
  }

  public asignarEliminacion(producto: ProductoDTO): void {
    this.deleteClicked.emit(producto);
  }
}
