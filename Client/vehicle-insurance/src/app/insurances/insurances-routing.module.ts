import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInsuranceComponent } from './add-insurance/add-insurance.component';
import { CheckInsurancesComponent } from './check-insurances/check-insurances.component';
import { InsuranceDetailsComponent } from './insurance-details/insurance-details.component';


const routes: Routes = [
  { path: 'check-insurance', component: CheckInsurancesComponent },
  { path: 'add-insurance', component: AddInsuranceComponent },
  { path: ':id', component: InsuranceDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesRoutingModule { }
