import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerRoutingModule } from './worker-routing.module';
import { ManageShipmentComponent } from './manage-shipment/manage-shipment.component';
import {AngularMaterialModule} from '../angular-material.module';

@NgModule({
  declarations: [ManageShipmentComponent],
  imports: [
    CommonModule,
    WorkerRoutingModule,
    AngularMaterialModule
  ]
})
export class WorkerModule { }
