import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  checkForm = new FormGroup ({
    egn: new FormControl('')
  });

  onSubmit() {
    console.log(this.checkForm.value.egn)
  }

}
