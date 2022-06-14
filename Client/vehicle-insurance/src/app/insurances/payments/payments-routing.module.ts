import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPaymentsComponent } from './all-payments/all-payments.component';
import { PaymentToPayComponent } from './payment-to-pay/payment-to-pay.component';

const routes: Routes = [
  { path: '', component: AllPaymentsComponent },
  { path: 'to-pay', component: PaymentToPayComponent}
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
