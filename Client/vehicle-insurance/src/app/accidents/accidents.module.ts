import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccidentsRoutingModule } from './accidents-routing.module';
import { AccidentsComponent } from './accidents.component';
import { AllAccidentsComponent } from './all-accidents/all-accidents.component';
import { CheckAccidentComponent } from './check-accident/check-accident.component';
import { AddAccidentComponent } from './add-accident/add-accident.component';
import { AccidentDetailsComponent } from './accident-details/accident-details.component';


@NgModule({
  declarations: [
    AccidentsComponent,
    AllAccidentsComponent,
    CheckAccidentComponent,
    AddAccidentComponent,
    AccidentDetailsComponent
  ],
  imports: [
    CommonModule,
    AccidentsRoutingModule
  ]
})
export class AccidentsModule { }
