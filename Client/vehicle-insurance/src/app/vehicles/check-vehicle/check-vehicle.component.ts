import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-check-vehicle',
  templateUrl: './check-vehicle.component.html',
  styleUrls: ['./check-vehicle.component.css']
})
export class CheckVehicleComponent implements OnInit {

  checkForm: FormGroup;
  status: number = 0;
  isExists: boolean;
  vehicleId: string;
  loading: boolean = false;
  constructor(private vehicelService: VehicleService, private fb: FormBuilder) {
    this.checkForm = this.fb.group({
      'registrationNumber': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    })
   }

   get registrationNumber() {
     return this.checkForm.get('registrationNumber');
   }

   checkVehicleFormImageUrl = environment.checkVehicleFormImageUrl;

   onSubmit() {
    this.loading = true;
    this.vehicelService.findVehicle(this.checkForm.value).subscribe({
      next: (res) => {
        this.status = res.status;
        this.isExists = true;
        res.body?._id != null ? this.vehicleId = res.body._id : this.vehicleId = "";
        this.loading = false;
      }, error: (err) => {
        this.status = err.status;
        this.isExists = false;
        this.loading = false;
      }
    })
   }

  ngOnInit(): void {
  }

}
