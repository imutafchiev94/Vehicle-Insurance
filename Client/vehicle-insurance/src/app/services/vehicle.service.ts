import { Injectable } from '@angular/core';
import { Vehicle } from '../models/Vehicle';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private vehiclePath = environment.apiUrl + '/vehicle';
  constructor(private http: HttpClient) { }

  findVehicle(data) : Observable<HttpResponse<Vehicle>> {
    return this.http.post<Vehicle>(this.vehiclePath + '/find', data, {observe: 'response'});
  }

  findVehicleByOwner(data) : Observable<HttpResponse<Vehicle>> {
    return this.http.post<Vehicle>(this.vehiclePath + '/find-by-owner', data, {observe: 'response'});
  }

  addVehicle(ownerId ,data) : Observable<HttpResponse<Vehicle>> {
    return this.http.post<Vehicle>(this.vehiclePath + `/${ownerId}/add`, data, {observe: 'response'});
  }

  getVehicleDetails(vehicleId): Observable<HttpResponse<Vehicle>> {
    return this.http.get<Vehicle>(this.vehiclePath + `${vehicleId}`, {observe: 'response'});
  }

}
