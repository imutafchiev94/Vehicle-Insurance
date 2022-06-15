import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../../models/Vehicle';
import { map, mergeMap } from 'rxjs/operators';
import { VehicleService } from '../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  vehicle: Vehicle;
  hasInsurance: boolean;
  loading: boolean = false;
  constructor(private vehicleService: VehicleService, 
    private route: ActivatedRoute, 
    private router: Router) 
    {
      
    }
    
    ngOnInit(): void {
      this.loading = true;
      this.fetchData();
    }

    fetchData() {
      this.route.params.pipe(map(params => {
        const id = params['id'];
        return id;
      }), mergeMap(id => 
        this.vehicleService.getVehicleDetails(id))).subscribe({
          next: (res) => {
            res.body != null ? this.vehicle = res.body : 0;
            this.vehicle.insurance != null ? this.hasInsurance = true : this.hasInsurance = false;
            this.loading = false;
          }, error: (err) => {
            this.router.navigate(['error'], {relativeTo: this.route, skipLocationChange: true});
          }
        })
    }
  


}
