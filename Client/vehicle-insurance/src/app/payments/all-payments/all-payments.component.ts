import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../../services/payment.service';
import {Payment} from '../../models/Payment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-payments',
  templateUrl: './all-payments.component.html',
  styleUrls: ['./all-payments.component.css']
})
export class AllPaymentsComponent implements OnInit {


  allPaymentsForm: FormGroup;
  payments;
  datePipe: DatePipe = new DatePipe('en-US');
  status: number;
  isExists: boolean;
  insuranceId: string;
  constructor(private paymentService: PaymentService,
    private fb: FormBuilder) { 
      this.allPaymentsForm = this.fb.group({
        registrationNumber: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(6)]]
      })
    }

  ngOnInit(): void {
  }

  get registrationNumber() {
    return this.allPaymentsForm.get('registrationNumber');
  }

  onSubmit() {
    this.paymentService.getAllPayments(this.allPaymentsForm.value).subscribe({
      next: (res) => {
        this.status = res.status;
        this.isExists = true;
        this.payments = res.body;
        console.log(this.payments);
      }, error: (err) => {
        this.status = err.status;
       this.isExists = false;
      }
    })
  }

}
