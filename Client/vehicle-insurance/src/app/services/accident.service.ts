import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Accident } from '../models/Accident';

@Injectable({
  providedIn: 'root'
})
export class AccidentService {

  accidentPath = environment.apiUrl + 'accident';
  constructor(private http: HttpClient) { }

  getAllAccidents(): Observable<HttpResponse<Array<Accident>>> {
    return this.http.get<Array<Accident>>(this.accidentPath, {observe: 'response'});
  }

  getAccident(id): Observable<HttpResponse<Accident>> {
    return this.http.get<Accident>(this.accidentPath + `/${id}`, {observe: 'response'});
  }

  findAccident(data): Observable<HttpResponse<Accident>> {
    return this.http.post<Accident>(this.accidentPath + '/find', data, {observe: 'response'});
  }

  addAccident(data): Observable<HttpResponse<Accident>> {
    return this.http.post<Accident>(this.accidentPath + '/add', data, {observe: 'response'});
  }
}
