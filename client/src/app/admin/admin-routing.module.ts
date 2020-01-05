import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AllShipmentComponent} from './all-shipment/all-shipment.component';
import {AddShipmentComponent} from './add-shipment/add-shipment.component';
import {AddWorkerComponent} from './add-worker/add-worker.component';
import {AllWorkerComponent} from './all-worker/all-worker.component';

const routes: Routes = [
  {path: 'all-shipment', component: AllShipmentComponent},
  {path: 'add-shipment', component: AddShipmentComponent},
  {path: 'all-worker', component: AllWorkerComponent},
  {path: 'add-worker', component: AddWorkerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
