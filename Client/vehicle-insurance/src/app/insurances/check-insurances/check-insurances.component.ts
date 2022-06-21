import { Component, OnInit } from '@angular/core';
import { InsuranceService } from '../../services/insurance.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-check-insurances',
  templateUrl: './check-insurances.component.html',
  styleUrls: ['./check-insurances.component.css']
})
export class CheckInsurancesComponent implements OnInit {

  checkForm: FormGroup;
  status: number = 0;
  isExists: boolean;
  insuranceId: string;
  loading: boolean = false;
  constructor(private insuranceService: InsuranceService, private fb: FormBuilder) {
    this.checkForm = this.fb.group({
      registrationNumber: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    })
   }

  ngOnInit(): void {
  }

  get registrationNumber() {
    return this.checkForm.get('registrationNumber');
  }

  checkInsuranceFormImageUrl = environment.checkInsuranceFormImageUrl;

  onSubmit() {
    this.loading = true;
   this.insuranceService.findInsurance(this.checkForm.value).subscribe({
     next: (res) => {
       this.status = 200;
       this.isExists = true;
       res?._id != null ? this.insuranceId = res._id : this.insuranceId = "";
       this.loading = false;
     }, error: (err) => {
       this.status = err.status;
       this.isExists = false;
       this.loading = false;
     }
   })
  }

}
