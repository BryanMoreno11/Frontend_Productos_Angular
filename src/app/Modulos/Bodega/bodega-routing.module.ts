import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodegaListComponent } from './pages/bodega-list/bodega-list.component';

const routes: Routes = [
  { path: '', component: BodegaListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodegaRoutingModule { }
