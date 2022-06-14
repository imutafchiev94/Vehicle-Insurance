import { Component, OnInit } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PaymentService } from '../../../services/payment.service';
import { InsuranceService } from '../../../services/insurance.service';
import { Insurance } from '../../../models/Insurance';


@Component({
  selector: 'app-all-payments',
  templateUrl: './all-payments.component.html',
  styleUrls: ['./all-payments.component.css']
})
export class AllPaymentsComponent implements OnInit {

  payments;
  insurance: Insurance;
  datePipe: DatePipe = new DatePipe('en-US');
  haveToPay: boolean = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private insuranceService: InsuranceService) { 
      this.fetchDataPayments();
      this.fetchDataInsurance();
    }

  ngOnInit(): void {
  }

  fetchDataPayments() {
    this.route.params.pipe(map(params => {
      const id = params['id'];
      return id;
    }), mergeMap(id => this.paymentService.getAllPayments(id))).subscribe({
      next: (res) => {
        console.log(res);
        res.body != null ? this.payments = res.body : 0;
        for (let i = 0; i < this.payments.length; i++) {
          this.payments[i].startDate = this.datePipe.transform(this.payments[i].startDate, 'dd-MM-YYYY');
          this.payments[i].endDate = this.datePipe.transform(this.payments[i].endDate, 'dd-MM-YYYY');
        }
        this.haveToPay = this.payments.some(p => p.isPaid == false)
      }, error: (err) => {
        console.log(err);
      this.router.navigate(['/error'], {relativeTo: this.route, skipLocationChange: true})
      }
    })
  }

  fetchDataInsurance() {
    this.route.params.pipe(map(params => {
      const id = params['id'];
      return id;
    }), mergeMap(id => this.insuranceService.getInsurance(id))).subscribe({
      next: (res) => {
        res.body != null ? this.insurance = res.body : 0;
      }, error: (err) => {
      this.router.navigate(['/error'], {relativeTo: this.route, skipLocationChange: true})
      }
    })
  }

}
