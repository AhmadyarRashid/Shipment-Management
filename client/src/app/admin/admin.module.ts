import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AllWorkerComponent } from './all-worker/all-worker.component';
import { AddWorkerComponent } from './add-worker/add-worker.component';
import { AddShipmentComponent } from './add-shipment/add-shipment.component';
import { AllShipmentComponent } from './all-shipment/all-shipment.component';
import {AngularMaterialModule} from '../angular-material.module';
import { AssignWorkersComponent } from './assign-workers/assign-workers.component';

@NgModule({
  declarations: [AllWorkerComponent, AddWorkerComponent, AddShipmentComponent, AllShipmentComponent, AssignWorkersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
