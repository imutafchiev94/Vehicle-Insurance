import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsuranceService } from '../../services/insurance.service';
import { CountOfPayments } from '../../models/enums/CountOfPayments';
import { Router } from '@angular/router';
import { read } from '@popperjs/core';

@Component({
  selector: 'app-add-insurance',
  templateUrl: './add-insurance.component.html',
  styleUrls: ['./add-insurance.component.css']
})
export class AddInsuranceComponent implements OnInit {

  insuranceForm: FormGroup;
  errorMessage: string;
  status: string;
  imageSrc;
  file;
  loading: boolean = false;
  constructor(private fb: FormBuilder, private insuranceService: InsuranceService, private router: Router) {
    this.insuranceForm = this.fb.group({
      startDate: ['', Validators.required],
      ownerEGN: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      vehicleRegistrationNumber: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      imageSource: ['', Validators.required],
      totalAmount: ['', [Validators.required, Validators.min(50)]],
      countOfPayments: ['', Validators.required],

    })
   }

   get startDate() {
    return this.insuranceForm.get('startDate');
   }

   get ownerEGN() {
    return this.insuranceForm.get('ownerEGN');
   }

   get vehicleRegistrationNumber() {
    return this.insuranceForm.get('vehicleRegistrationNumber');
   }

   get totalAmount() {
    return this.insuranceForm.get('totalAmount');
   }

   get countOfPayments() {
    return this.insuranceForm.get('countOfPayments');
   }

   get imageSource() {
    return this.insuranceForm.get('imageUrl');
   }

 

   options: number[] = [CountOfPayments['One Month'], 
   CountOfPayments['Two Months'], 
   CountOfPayments['Three Months'], 
   CountOfPayments['Four Months'], 
   CountOfPayments['Six Months'], 
   CountOfPayments['Twelve Months']
  ];

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.file = event.target.files[0]
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
     this.imageSrc = (<FileReader>event.target).result;
     this.insuranceForm.patchValue({imageSource: this.imageSrc});
   }
}
  onSubmit() {
    this.loading = true;
    console.log(this.insuranceForm.value);
    this.insuranceService.addInsurance(this.insuranceForm.value).subscribe({next: (res) => {
      this.router.navigate(['home']);
    }, error: (err) => {
      console.log(err);
      this.errorMessage = err.error.Error;
    }})
  }

}
