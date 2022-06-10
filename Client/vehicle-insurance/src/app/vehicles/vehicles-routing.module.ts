import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { FindVehicleByOwnerComponent } from './find-vehicle-by-owner/find-vehicle-by-owner.component';
import { CheckVehicleComponent } from './check-vehicle/check-vehicle.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';

const routes: Routes = [
  { path: 'check-vehicle', component: CheckVehicleComponent },
  { path: 'add-vehicle', component: AddVehicleComponent },
  { path: ':id', component: VehicleDetailsComponent },
  { path: '/find-vehicle-by-owner', component: FindVehicleByOwnerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
