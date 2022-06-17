import { Component, OnInit } from '@angular/core';
import { AccidentService } from '../../services/accident.service';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-accident',
  templateUrl: './check-accident.component.html',
  styleUrls: ['./check-accident.component.css']
})
export class CheckAccidentComponent implements OnInit {

  checkForm: FormGroup;
  status: number = 0;
  isExists: boolean;
  accidentId: string;
  loading: boolean = false;
  constructor(private fb: FormBuilder, private accidentService: AccidentService) { 
      this.checkForm = this.fb.group({
        vehicleRegistrationNumber: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
      });
   }

   get vehicleRegistrationNumber() {
    return this.checkForm.get('vehicleRegistrationNumber');
  }

  checkAccidentFormImageUrl = environment.checkAccidentFormImageUrl;

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
   this.accidentService.findAccident(this.checkForm.value).subscribe({
     next: (res) => {
       this.status = res.status;
       this.isExists = true;
       res.body?._id != null ? this.accidentId = res.body._id : this.accidentId = "";
       this.loading = false;
     }, error: (err) => {
       this.status = err.status;
       this.isExists = false;
       this.loading = false;
     }
   })
  }

}
