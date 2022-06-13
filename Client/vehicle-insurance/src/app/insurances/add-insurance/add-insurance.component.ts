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

  readUrl(event:any) {
    this.imageSrc = event.target.value;

    let splitPath = this.imageSrc.split('\\');
    let fileName = splitPath[splitPath.length - 1];
    let trueImageSrc = `C:\\Users\\ivaylo.mutafchiev\\Downloads\\${fileName}`;
    
    this.insuranceForm.patchValue({imageSource: trueImageSrc});

    console.log(this.insuranceForm.value);
  }


  onSubmit() {
    console.log(this.insuranceForm.value);
    this.insuranceService.addInsurance(this.insuranceForm.value).subscribe({next: (res) => {
      this.router.navigate(['dashboard']);
    }, error: (err) => {
      console.log(err);
      this.errorMessage = err.error.Error;
    }})
  }

}
