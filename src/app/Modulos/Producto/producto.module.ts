import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoListComponent } from './pages/producto-list/producto-list.component';
import { ProductoTableComponent } from './components/producto-table/producto-table.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

// Providers y Forms
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductoListComponent,
    ProductoTableComponent,
    ProductoFormComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    TableModule,
    ButtonModule,
    SkeletonModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class ProductoModule { }
