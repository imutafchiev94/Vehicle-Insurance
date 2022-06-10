import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPaidPaymentsComponent } from './all-paid-payments/all-paid-payments.component';
import { AllPaymentsComponent } from './all-payments/all-payments.component';
import { AllUnpaidPaymentsComponent } from './all-unpaid-payments/all-unpaid-payments.component';
import { PaymentToPayComponent } from './payment-to-pay/payment-to-pay.component';

const routes: Routes = [
  { path: 'all-payments', component: AllPaymentsComponent },
  { path: 'all-paid-payments', component: AllPaidPaymentsComponent},
  { path: 'all-unpaid-payments', component: AllUnpaidPaymentsComponent},
  { path: 'payment-to-pay', component: PaymentToPayComponent},
  { path: '', redirectTo: "all-payments", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
