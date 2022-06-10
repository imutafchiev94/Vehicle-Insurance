import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnersRoutingModule } from './owners-routing.module';
import { OwnersComponent } from './owners.component';
import { AddOwnerComponent } from './add-owner/add-owner.component';
import { MaterialExampleModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckOwnerComponent } from './check-owner/check-owner.component';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';



@NgModule({
  declarations: [
    OwnersComponent,
    AddOwnerComponent,
    CheckOwnerComponent,
    OwnerDetailsComponent
  ],
  imports: [
    CommonModule,
    OwnersRoutingModule,
    MaterialExampleModule,
    ReactiveFormsModule
  ]
})
export class OwnersModule { }
