import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsuranceService } from '../../services/insurance.service';
import { CountOfPayments } from '../../models/enums/CountOfPayments';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-insurance',
  templateUrl: './add-insurance.component.html',
  styleUrls: ['./add-insurance.component.css'],
})
export class AddInsuranceComponent implements OnInit {
  insuranceForm: FormGroup;
  errorMessage: string;
  status: string;
  imageSrc;
  file;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private insuranceService: InsuranceService,
    private router: Router
  ) {
    this.insuranceForm = this.fb.group({
      ownerEGN: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      vehicleRegistrationNumber: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(8)],
      ],
      imageSource: ['', Validators.required],
      totalAmount: ['', [Validators.required, Validators.min(50)]],
      countOfPayments: ['', Validators.required],
    });
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

  options: number[] = [
    CountOfPayments['One Month'],
    CountOfPayments['Two Months'],
    CountOfPayments['Three Months'],
    CountOfPayments['Four Months'],
    CountOfPayments['Six Months'],
    CountOfPayments['Twelve Months'],
  ];

  ngOnInit(): void {}

  onFileSelected(event) {
    this.file = event.target.files[0];
    this.resizeImage(this.file, 350, 250).then(
      (blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result.toString();
          this.insuranceForm.patchValue({ imageSource: this.imageSrc });
        };

        reader.readAsDataURL(blob);
        this.insuranceForm.patchValue({ imageSource: this.imageSrc });
      },
      (error) => {
        console.log('Photo error!', error);
      }
    );
  }

  resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        const width = image.width;
        const height = image.height;

        if (width <= maxWidth && height <= maxHeight) {
          resolve(file);
        }

        let newWidth;
        let newHeight;

        if (width > height) {
          newHeight = height * (maxWidth / width);
          newWidth = maxWidth;
        } else {
          newWidth = width * (maxHeight / height);
          newHeight = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        const context = canvas.getContext('2d');

        context?.drawImage(image, 0, 0, newWidth, newHeight);

        canvas.toBlob(resolve, file.type);
      };
      image.onerror = reject;
    });
  }

  onSubmit() {
    this.loading = true;
    this.insuranceService.addInsurance(this.insuranceForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['home']);
      },
      error: (err) => {
        this.errorMessage = err.error.Error;
      },
    });
  }
}
