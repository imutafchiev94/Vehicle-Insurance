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

  getAllPayments(data): Observable<HttpResponse<Payment>> {
    return this.http.post<Payment>(this.paymentsUrl + '/all', data, {observe: 'response'});
  }

  getAllPaidPayments(data): Observable<HttpResponse<Payment>> {
    return this.http.post<Payment>(this.paymentsUrl + '/paid', data, {observe: 'response'});
  }

  getAllUnpaidPayments(data): Observable<HttpResponse<Payment>> {
    return this.http.post<Payment>(this.paymentsUrl + '/unpaid', data, {observe: 'response'});
  }

  getPaymentToPay(data): Observable<HttpResponse<Payment>> {
    return this.http.post<Payment>(this.paymentsUrl + '/to-pay', data, {observe: 'response'});
  }

  payPayment(data, insuranceId): Observable<HttpResponse<Payment>> {
    return this.http.post<Payment>(this.paymentsUrl + `/pay/${insuranceId}`, data, {observe: 'response'});
  }
  
}
