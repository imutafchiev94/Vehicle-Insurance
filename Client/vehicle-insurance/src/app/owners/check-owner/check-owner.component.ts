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
  loading: boolean = false;
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
    this.loading = true;
    this.ownerService.findOwner(this.checkForm.value).subscribe({next: (res) => {
      this.status = 200;
        this.isExists = true;
        res?._id ? this.ownerId = res._id : this.ownerId = "";
        this.loading = false;
    }, error: (error) => {
      this.status = error.status;
      this.isExists = false;
      this.loading = false;
    }});
  }

}
