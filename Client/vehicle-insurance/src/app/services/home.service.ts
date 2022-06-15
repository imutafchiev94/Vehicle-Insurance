import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Home } from '../models/Home'; 

@Injectable({
  providedIn: 'root'
})
export class HomeService {

   private homePath = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDashboardImage() : Observable<HttpResponse<Home>> {
    return this.http.get<Home>(this.homePath, {observe: 'response'});
  }
}
