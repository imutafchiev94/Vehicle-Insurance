import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { AllPaymentsComponent } from './all-payments/all-payments.component';
import { PaymentToPayComponent } from './payment-to-pay/payment-to-pay.component';
import { MaterialExampleModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';


@NgModule({
  declarations: [
    PaymentsComponent,
    AllPaymentsComponent,
    PaymentToPayComponent,
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ]
})
export class PaymentsModule { }
