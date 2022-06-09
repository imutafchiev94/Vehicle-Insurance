import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Owner} from '../models/Owner';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private ownerPath = environment.apiUrl + 'owner';
  constructor(private http: HttpClient) { }

  findOwner(data) : Observable<HttpResponse<Owner>> {
    return this.http.post<Owner>(this.ownerPath + '/find', data, {observe: 'response'});
  }
}
