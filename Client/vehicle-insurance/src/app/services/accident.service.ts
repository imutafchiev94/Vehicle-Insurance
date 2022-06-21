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

  getAllAccidents(): Observable<Array<Accident>> {
    return this.http.get<Array<Accident>>(this.accidentPath);
  }

  getAccident(id): Observable<Accident> {
    return this.http.get<Accident>(this.accidentPath + `/${id}`);
  }

  findAccident(data): Observable<Accident> {
    return this.http.post<Accident>(this.accidentPath + '/find', data);
  }

  addAccident(data): Observable<string> {
    return this.http.post<string>(this.accidentPath + '/add', data);
  }
}
