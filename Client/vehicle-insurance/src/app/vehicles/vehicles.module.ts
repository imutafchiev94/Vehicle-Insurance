import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehiclesComponent } from './vehicles.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { CheckVehicleComponent } from './check-vehicle/check-vehicle.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from 'src/material.module';


@NgModule({
  declarations: [
    VehiclesComponent,
    AddVehicleComponent,
    CheckVehicleComponent,
    VehicleDetailsComponent,

  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    ReactiveFormsModule,
    MaterialExampleModule
  ]
})
export class VehiclesModule { }
