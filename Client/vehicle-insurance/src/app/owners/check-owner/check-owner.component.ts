import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OwnerService} from '../../services/owner.service';
import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-check-owner',
  templateUrl: './check-owner.component.html',
  styleUrls: ['./check-owner.component.css']
})
export class CheckOwnerComponent implements OnInit {

  checkForm: FormGroup;
  constructor(private fb: FormBuilder, private ownerService: OwnerService) {
    this.checkForm = this.fb.group({
      EGN: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    })
   }

  ngOnInit(): void {
  }

  get EGN() {
    return this.checkForm.get('EGN');
  }

  ownerId: string = "";

  checkFormImageUrl = environment.checkOwnerFormImageUrl;

  isExists: boolean = false;

  status = 0;

  onSubmit() {
    
    this.ownerService.findOwner(this.checkForm.value).subscribe({next: (res) => {
      this.status = res.status;
        this.isExists = true;
        res.body?._id ? this.ownerId = res.body._id : this.ownerId = "";
    }, error: (error) => {
      this.status = error.status;
      this.isExists = false;
    }});
  }

}
