import { Injectable } from '@angular/core';
import { Vehicle } from '../models/Vehicle';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private vehiclePath = environment.apiUrl + 'vehicle';
  constructor(private http: HttpClient) { }

  findVehicle(data) : Observable<Vehicle> {
    return this.http.post<Vehicle>(this.vehiclePath + '/find', data,);
  }

  addVehicle(data) : Observable<Vehicle> {
    return this.http.post<Vehicle>(this.vehiclePath + '/add', data,);
  }

  getVehicleDetails(vehicleId): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.vehiclePath + `/${vehicleId}`);
  }

  isExists(EGN) : Observable<Boolean> {
    return this.http.post<Boolean>(this.vehiclePath + '/is-exists', EGN);
  }
}
