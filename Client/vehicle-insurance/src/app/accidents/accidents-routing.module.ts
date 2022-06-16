import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccidentsComponent } from './accidents.component';

const routes: Routes = [{ path: '', component: AccidentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccidentsRoutingModule { }
