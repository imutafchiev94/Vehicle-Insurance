import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesRoutingModule } from './insurances-routing.module';
import { InsurancesComponent } from './insurances.component';
import { CheckInsurancesComponent } from './check-insurances/check-insurances.component';
import { AddInsuranceComponent } from './add-insurance/add-insurance.component';
import { InsuranceDetailsComponent } from './insurance-details/insurance-details.component';
import { MaterialExampleModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AllInsurancesComponent } from './all-insurances/all-insurances.component';


@NgModule({
  declarations: [
    InsurancesComponent,
    CheckInsurancesComponent,
    AddInsuranceComponent,
    InsuranceDetailsComponent,
    AllInsurancesComponent
  ],
  imports: [
    CommonModule,
    InsurancesRoutingModule,
    MaterialExampleModule,
    ReactiveFormsModule
  ]
})
export class InsurancesModule { }
