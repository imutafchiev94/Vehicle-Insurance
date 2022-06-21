import { Component, OnInit } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { Payment } from '../../../models/Payment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-payment-to-pay',
  templateUrl: './payment-to-pay.component.html',
  styleUrls: ['./payment-to-pay.component.css']
})
export class PaymentToPayComponent implements OnInit {

  payment: Payment;
  paymentForm: FormGroup;
  errorMessage: string;
  loading: boolean = false;
  httpLoading: boolean = false;
  constructor(private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private paymentService: PaymentService) {

      this.paymentForm = this.fb.group({
        creditCardHolderName: ['', Validators.required],
        creditCardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
        creditCardExpire: ['', Validators.required],
        creditCardCVC: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
      })
      
    }
    
    ngOnInit(): void {
      this.loading = true;
      this.fetchDataPayments();
  }

  get creditCardHolderName() {
    return this.paymentForm.get('creditCardHolderName');
  }

  get creditCardNumber() {
    return this.paymentForm.get('creditCardNumber');
  }

  get creditCardExpire() {
    return this.paymentForm.get('creditCardExpire');
  }

  get creditCardCVC() {
    return this.paymentForm.get('creditCardCVC');
  }

  fetchDataPayments() {
    this.route.params.pipe(map(params => {
      const id = params['id'];
      return id;
    }), mergeMap(id => this.paymentService.getPaymentToPay(id))).subscribe({
      next: (res) => {
        res != null ? this.payment = res : 0;
        this.loading = false;
      }, error: (err) => {
      this.router.navigate(['/error'], {relativeTo: this.route, skipLocationChange: true})
      }
    })
  }

  onSubmit() {
    this.httpLoading = true;
    this.paymentService.payPayment(this.payment._id).subscribe({
      next: (res) => {
        this.router.navigate([`/insurances/${this.payment.insurance}`]);
      }, error: (err) => {
        this.httpLoading = false;
        this.errorMessage = err.error.Error;
      }
    })
  }
 
}
