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

  payments: any = [];
  insurance: Insurance;
  datePipe: DatePipe = new DatePipe('en-US');
  haveToPay: boolean = false;
  loading: boolean = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private insuranceService: InsuranceService) { 

    }

  ngOnInit(): void {
    this.loading = true;
    this.fetchDataPayments();
    this.fetchDataInsurance();
  }

  fetchDataPayments() {
    this.route.params.pipe(map(params => {
      const id = params['id'];
      return id;
    }), mergeMap(id => this.paymentService.getAllPayments(id))).subscribe({
      next: (res) => {
        res != null ? this.payments = res : 0;
        for (let i = 0; i < this.payments.length; i++) {
          this.payments[i].startDate = this.datePipe.transform(this.payments[i].startDate, 'dd-MM-YYYY');
          this.payments[i].endDate = this.datePipe.transform(this.payments[i].endDate, 'dd-MM-YYYY');
        }
        this.haveToPay = this.payments.some(p => p.isPaid == false)
        this.loading = false;
      }, error: (err) => {
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
        res != null ? this.insurance = res : 0;
      }, error: (err) => {
      this.router.navigate(['/error'], {relativeTo: this.route, skipLocationChange: true})
      }
    })
  }

}
