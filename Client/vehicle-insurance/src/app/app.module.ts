import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { OwnerComponent } from './owner/owner.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { PaymentComponent } from './payment/payment.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { HomeComponent } from './home/home.component';

import { AllPaidPaymentsComponent } from './payment/all-paid-payments/all-paid-payments.component';
import { AllUnpaidPaymentsComponent } from './payment/all-unpaid-payments/all-unpaid-payments.component';
import { PaymentToPayComponent } from './payment/payment-to-pay/payment-to-pay.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialExampleModule} from '../material.module';
import {HttpClientModule} from '@angular/common/http';
import { AllPaymentsComponent } from './payment/all-payments/all-payments.component';
import { HeaderComponent } from './home/header/header.component';
import { CheckComponent } from './owner/check/check.component';
import { AddOwnerComponent } from './owner/add-owner/add-owner.component';
import { OwnerDetailsComponent } from './owner/owner-details/owner-details.component';

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

    AllPaidPaymentsComponent,
    AllUnpaidPaymentsComponent,
    PaymentToPayComponent,
    AllPaymentsComponent,
    HeaderComponent,
    CheckComponent,
    AddOwnerComponent,
    OwnerDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
