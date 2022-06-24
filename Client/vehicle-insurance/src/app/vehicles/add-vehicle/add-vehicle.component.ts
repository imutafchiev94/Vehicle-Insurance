import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { OwnerService } from '../../services/owner.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  vehicleForm: FormGroup;
  errorMessage: string;
  loading: boolean = false;
  constructor(private fb: FormBuilder,
    private vehicleService: VehicleService, 
    private router: Router,
    private ownerService: OwnerService) { 
      this.vehicleForm = this.fb.group({
        brand: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
        model: ['', Validators.required],
        yearOfManufacture: ['', [Validators.required, Validators.min(1930), Validators.max(2022)]],
        registrationNumber: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
        ownerEGN: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
      });
    }

  ngOnInit(): void {
  }

  get brand() {
    return this.vehicleForm.get('brand');
  }

  get model() {
    return this.vehicleForm.get('model');
  }

  get yearOfManufacture() {
    return this.vehicleForm.get('yearOfManufacture');
  }
  
  get registrationNumber() {
    return this.vehicleForm.get('registrationNumber');
  }

  get ownerEGN() {
    return this.vehicleForm.get('ownerEGN');
  }

  checkEGN(event) {
    if(event.target.value) {

      this.ownerService.findOwner({EGN: event.target.value}).subscribe({
        next: (res) => {
          this.errorMessage = "";
        }, error: (err) => {
          this.errorMessage = "Owner with this EGN doesn't exist in our database!"
        }
      })
    }
  }


  onSubmit() {
    this.loading = true;
    this.vehicleService.addVehicle(this.vehicleForm.value).subscribe({
      next: (res) => {
        const navigationExtras: NavigationExtras = {state: {data: res}};
        this.router.navigate(['home'], navigationExtras);
      }, error: (err) => {
        this.loading = false;
        this.errorMessage = err.error.Error;
      }
    })
  }
}
