import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccidentService } from '../../services/accident.service';
import { Gender } from '../../models/enums/Gender';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-accident',
  templateUrl: './add-accident.component.html',
  styleUrls: ['./add-accident.component.css']
})
export class AddAccidentComponent implements OnInit {

  accidentForm: FormGroup;
  errorMessage: string;
  status: string;
  imageSrc;
  file;
  loading: boolean = false;
  constructor(private fb: FormBuilder, private accidentService: AccidentService, private router: Router) { 
    this.accidentForm = this.fb.group({
      vehicleRegistrationNumber: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      accidentDate: ['', Validators.required],
      driverFirstName: ['', [Validators.required, Validators.minLength(3)]],
      driverMiddleName: [''],
      driverSurname: ['', [Validators.required, Validators.minLength(3)]],
      driverGender: ['', Validators.required],
      imageSource: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(50)]],
      driverEGN: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      driverDateOfBirth: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  get vehicleRegistrationNumber() {
    return this.accidentForm.get('vehicleRegistrationNumber');
  }

  get accidentDate() {
    return this.accidentForm.get('accidentDate');
  }

  get driverFirstName() {
    return this.accidentForm.get('driverFirstName');
  }

  get driverMiddleName() {
    return this.accidentForm.get('driverMiddleName');
  }

  get driverSurname() {
    return this.accidentForm.get('driverSurname');
  }

  get driverGender() {
    return this.accidentForm.get('driverGender');
  }

  get driverEGN() {
    return this.accidentForm.get('driverEGN');
  }

  get imageSource() {
    return this.accidentForm.get('imageSource');
  }

  get description() {
    return this.accidentForm.get('description');
  }

  get driverDateOfBirth() {
    return this.accidentForm.get('driverDateOfBirth');
  }

  options: string[] = [Gender.Female, Gender.Male]; 


  onFileSelected(event) {
    this.file = event.target.files[0]
    this.resizeImage(this.file, 350, 250).then(blob => {
      const reader = new FileReader();
      reader.onload = () => {
          this.imageSrc = reader.result.toString();
      };

      reader.readAsDataURL(blob);
      this.accidentForm.patchValue({imageSource: this.imageSrc});

    }, error => {
        console.log("Photo error!", error);
    });
     
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
  this.accidentService.addAccident(this.accidentForm.value).subscribe({next: (res) => {
    this.router.navigate(['accidents/all']);
  }, error: (err) => {
    this.errorMessage = err.error.Error;
  }})
}

}
