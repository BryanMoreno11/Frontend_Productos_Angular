import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoListComponent } from './pages/producto-list/producto-list.component';
import { ProductoTableComponent } from './components/producto-table/producto-table.component';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    ProductoListComponent,
    ProductoTableComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    TableModule,
    ButtonModule,
    SkeletonModule
    // Asegúrate de importar aquí el SharedModule que contiene la directiva 'appAuthorized' en tu proyecto real
  ]
})
export class ProductoModule { }
