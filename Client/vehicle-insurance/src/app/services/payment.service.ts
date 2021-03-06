import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Payment } from '../models/Payment';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private paymentsUrl = environment.apiUrl + 'payment';
  constructor(private http: HttpClient) { }

  getAllPayments(insuranceId): Observable<Array<Payment>> {
    return this.http.get<Array<Payment>>(this.paymentsUrl + `/${insuranceId}/all`);
  }

  getPaymentToPay(insuranceId): Observable<Payment> {
    return this.http.get<Payment>(this.paymentsUrl + `/${insuranceId}/to-pay`);
  }

  payPayment(paymentId): Observable<Payment> {
    return this.http.post<Payment>(this.paymentsUrl + `/${paymentId}/pay`, null);
  }
  
}
