import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodegaRoutingModule } from './bodega-routing.module';
import { BodegaListComponent } from './pages/bodega-list/bodega-list.component';
import { BodegaTableComponent } from './components/bodega-table/bodega-table.component';
import { BodegaFormComponent } from './components/bodega-form/bodega-form.component';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

// Providers y Forms
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BodegaListComponent,
    BodegaTableComponent,
    BodegaFormComponent
  ],
  imports: [
    CommonModule,
    BodegaRoutingModule,
    TableModule,
    ButtonModule,
    SkeletonModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class BodegaModule { }
