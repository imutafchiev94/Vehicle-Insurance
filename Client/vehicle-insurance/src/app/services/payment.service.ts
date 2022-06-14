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

  getAllPayments(id): Observable<HttpResponse<Payment>> {
    return this.http.get<Payment>(this.paymentsUrl + `/${id}/all`, {observe: 'response'});
  }

  getPaymentToPay(id): Observable<HttpResponse<Payment>> {
    return this.http.get<Payment>(this.paymentsUrl + `/${id}/to-pay`, {observe: 'response'});
  }

  payPayment(insuranceId): Observable<HttpResponse<Payment>> {
    return this.http.post<Payment>(this.paymentsUrl + `/${insuranceId}/pay`, null, {observe: 'response'});
  }
  
}
