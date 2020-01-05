import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ManageShipmentComponent} from './manage-shipment/manage-shipment.component';

const routes: Routes = [
  {path: 'manage-shipment', component: ManageShipmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkerRoutingModule {
}
