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

  onSubmit() {
    
    this.ownerService.findOwner(this.checkForm.value).subscribe(res => {
      if(res.status == 200) {
        this.isExists = true;
      } else {
        this.isExists = false;
      }
    })
  }

}
