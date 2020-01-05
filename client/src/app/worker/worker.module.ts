import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerRoutingModule } from './worker-routing.module';
import { ManageShipmentComponent } from './manage-shipment/manage-shipment.component';


@NgModule({
  declarations: [ManageShipmentComponent],
  imports: [
    CommonModule,
    WorkerRoutingModule
  ]
})
export class WorkerModule { }
