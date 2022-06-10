import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { AllPaymentsComponent } from './all-payments/all-payments.component';
import { AllPaidPaymentsComponent } from './all-paid-payments/all-paid-payments.component';
import { AllUnpaidPaymentsComponent } from './all-unpaid-payments/all-unpaid-payments.component';
import { PaymentToPayComponent } from './payment-to-pay/payment-to-pay.component';


@NgModule({
  declarations: [
    PaymentsComponent,
    AllPaymentsComponent,
    AllPaidPaymentsComponent,
    AllUnpaidPaymentsComponent,
    PaymentToPayComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
