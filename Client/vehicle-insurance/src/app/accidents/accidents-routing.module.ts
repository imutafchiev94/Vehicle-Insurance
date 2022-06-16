import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccidentDetailsComponent } from './accident-details/accident-details.component';
import { AddAccidentComponent } from './add-accident/add-accident.component';
import { AllAccidentsComponent } from './all-accidents/all-accidents.component';
import { CheckAccidentComponent } from './check-accident/check-accident.component';

const routes: Routes = [
  { path: 'all', component: AllAccidentsComponent },
  { path: 'add-accident', component: AddAccidentComponent },
  { path: 'check-accident', component: CheckAccidentComponent},
  { path: ':id', component: AccidentDetailsComponent },
  { path: '', redirectTo: 'all', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccidentsRoutingModule { }
