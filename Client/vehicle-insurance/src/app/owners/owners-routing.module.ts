import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOwnerComponent } from './add-owner/add-owner.component';
import { CheckOwnerComponent } from './check-owner/check-owner.component';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';

const routes: Routes = [
  { path: 'check', component: CheckOwnerComponent },
  { path: 'add', component: AddOwnerComponent},
  {path: ':id', component: OwnerDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnersRoutingModule { }
