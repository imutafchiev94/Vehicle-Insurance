import { Component, OnInit } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PaymentService } from '../../../services/payment.service';
import { Payment } from '../../../models/Payment';


@Component({
  selector: 'app-all-payments',
  templateUrl: './all-payments.component.html',
  styleUrls: ['./all-payments.component.css']
})
export class AllPaymentsComponent implements OnInit {

  payments;
  datePipe: DatePipe = new DatePipe('en-US');
  constructor(private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService) { 
      this.fetchData();
    }

  ngOnInit(): void {
  }

  fetchData() {
    this.route.params.pipe(map(params => {
      console.log(params['id']);
      const id = params['id'];
      return id;
    }), mergeMap(id => this.paymentService.getAllPayments(id))).subscribe({
      next: (res) => {
        console.log(res);
        res.body != null ? this.payments = res.body : 0;
      }, error: (err) => {
        console.log(err);
      this.router.navigate(['/error'], {relativeTo: this.route, skipLocationChange: true})
      }
    })
  }

}
