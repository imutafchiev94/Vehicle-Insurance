import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';

import { CheckVehicleComponent } from './check-vehicle/check-vehicle.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';

const routes: Routes = [
  { path: 'check-vehicle', component: CheckVehicleComponent },
  { path: 'add-vehicle', component: AddVehicleComponent },
  { path: ':id', component: VehicleDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
