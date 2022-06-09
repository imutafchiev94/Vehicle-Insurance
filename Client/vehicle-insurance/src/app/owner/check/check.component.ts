import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {OwnerService} from '../../services/owner.service';
import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  constructor(private ownerService: OwnerService) { }

  ngOnInit(): void {
  }

  checkFormImageUrl = environment.checkOwnerFormImageUrl;

  checkForm = new FormGroup ({
    EGN: new FormControl('')
  });

  isExists: boolean = false;

  status = 0;

  onSubmit() {
    
    this.ownerService.findOwner(this.checkForm.value).subscribe(res => {
      this.status = res.status;
      console.log(res.statusText);
      if(res.status == 200) {
        this.isExists = true;
      }
    }, error => {
      this.status = error.status;
      this.isExists = false;
    });
  }

}
