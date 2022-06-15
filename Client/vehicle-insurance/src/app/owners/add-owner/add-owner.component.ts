import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {OwnerService} from '../../services/owner.service';
import {Gender} from '../../models/enums/Gender';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-owner',
  templateUrl: './add-owner.component.html',
  styleUrls: ['./add-owner.component.css']
})
export class AddOwnerComponent { 
  
  ownerForm: FormGroup;
  loading: boolean = false;
  constructor(private fb: FormBuilder, private ownerService: OwnerService, private router: Router) {  
    
    this.ownerForm = this.fb.group({
      'firstName': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      'middleName': ['', [Validators.minLength(3), Validators.maxLength(40)]],
      'surname': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      'age': ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      'dateOfBirth': ['',Validators.required],
      'gender': ['', Validators.required],
      'EGN': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    })
    console.log(this.ownerForm.get('firstName'))
  }

  options: string[] = [Gender.Female, Gender.Male];

  get firstName() {
    
    return this.ownerForm.get('firstName');
  }

  get middleName() {
    return this.ownerForm.get('middleName');
  }

  get surname() {
    return this.ownerForm.get('surname');
  }

  get age() {
    return this.ownerForm.get('age');
  }

  get dateOfBirth() {
    return this.ownerForm.get('dateOfBirth');
  }

  get gender() {
    return this.ownerForm.get('gender');
  }

  get EGN() {
    return this.ownerForm.get('EGN');
  }

  errorMessage: string = '';

  onSubmit() {
    this.loading = true;
      this.ownerService.addOwner(this.ownerForm.value).subscribe({next: (res) => {
        this.router.navigate(['home']);
      }, error: (err) => {
        this.loading = false;
        this.errorMessage = err.error.Error;
      }})
  }
}
