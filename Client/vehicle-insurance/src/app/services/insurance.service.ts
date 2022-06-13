import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Insurance } from '../models/Insurance';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  private insurancePath = environment.apiUrl + 'insurance';
  constructor(private http: HttpClient) { }

  addInsurance(data): Observable<HttpResponse<Insurance>> {
    return this.http.post<Insurance>(this.insurancePath + '/create', data, {observe: 'response'});
  }

  getInsurance(id): Observable<HttpResponse<Insurance>> {
    return this.http.get<Insurance>(this.insurancePath + `/${id}`, {observe: 'response'});
  }

  findInsurance(data): Observable<HttpResponse<Insurance>> {
    return this.http.post<Insurance>(this.insurancePath + '/find', data, {observe: 'response'});
  }
}
