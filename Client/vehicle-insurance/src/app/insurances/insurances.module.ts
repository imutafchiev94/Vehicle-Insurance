import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesRoutingModule } from './insurances-routing.module';
import { InsurancesComponent } from './insurances.component';
import { CheckInsurancesComponent } from './check-insurances/check-insurances.component';
import { AddInsuranceComponent } from './add-insurance/add-insurance.component';
import { InsuranceDetailsComponent } from './insurance-details/insurance-details.component';
import { MaterialExampleModule } from 'src/material.module';


@NgModule({
  declarations: [
    InsurancesComponent,
    CheckInsurancesComponent,
    AddInsuranceComponent,
    InsuranceDetailsComponent
  ],
  imports: [
    CommonModule,
    InsurancesRoutingModule,
    MaterialExampleModule
  ]
})
export class InsurancesModule { }
