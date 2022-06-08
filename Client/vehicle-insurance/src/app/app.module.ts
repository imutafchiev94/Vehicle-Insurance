import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { OwnerComponent } from './owner/owner.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { PaymentComponent } from './payment/payment.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { HomeComponent } from './home/home.component';
import { AllPaymentsComponent } from './payment/all-payments/all-payments.component';
import { AllPaidPaymentsComponent } from './payment/all-paid-payments/all-paid-payments.component';
import { AllUnpaidPaymentsComponent } from './payment/all-unpaid-payments/all-unpaid-payments.component';
import { PaymentToPayComponent } from './payment/payment-to-pay/payment-to-pay.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialExampleModule} from '../material.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    OwnerComponent,
    VehicleComponent,
    PaymentComponent,
    InsuranceComponent,
    HomeComponent,
    AllPaymentsComponent,
    AllPaidPaymentsComponent,
    AllUnpaidPaymentsComponent,
    PaymentToPayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
