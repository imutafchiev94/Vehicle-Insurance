import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPaidPaymentsComponent } from './payment/all-paid-payments/all-paid-payments.component';
import { AllPaymentsComponent } from './payment/all-payments/all-payments.component';
import { AllUnpaidPaymentsComponent } from './payment/all-unpaid-payments/all-unpaid-payments.component';
import { HomeComponent } from './home/home.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { OwnerComponent } from './owner/owner.component';
import { PaymentToPayComponent } from './payment/payment-to-pay/payment-to-pay.component';
import { PaymentComponent } from './payment/payment.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { CheckComponent } from './owner/check/check.component';
import { AddOwnerComponent } from './owner/add-owner/add-owner.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'owners', component: OwnerComponent, 
    children: [
      {path: 'check', component: CheckComponent},
      {path: 'add', component: AddOwnerComponent}
    ]
  },
  {path: 'vehicles', component: VehicleComponent},
  {path: 'payments', component: PaymentComponent,
    children: [
      {path: '', redirectTo: 'all', pathMatch: 'full'},
      {path: 'all', component: AllPaymentsComponent},
      {path: 'all-paid', component: AllPaidPaymentsComponent},
      {path: 'all-unpaid', component: AllUnpaidPaymentsComponent},
      {path: 'to-pay', component: PaymentToPayComponent}
    ]
  },
  {path: 'insurances', component: InsuranceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
