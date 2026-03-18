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
  
  @Output() actionClicked = new EventEmitter<ProductoDTO>();

  public asignarAccion(producto: ProductoDTO): void {
    this.actionClicked.emit(producto);
  }
}
