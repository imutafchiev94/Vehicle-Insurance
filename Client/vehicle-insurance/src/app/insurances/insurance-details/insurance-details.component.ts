import { Component, OnInit } from '@angular/core';
import {InsuranceService} from '../../services/insurance.service';
import {Insurance} from '../../models/Insurance';
import {map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-insurance-details',
  templateUrl: './insurance-details.component.html',
  styleUrls: ['./insurance-details.component.css']
})
export class InsuranceDetailsComponent implements OnInit {

  insurance: Insurance;
  startDate;
  endDate;
  datepipe: DatePipe = new DatePipe("en-US");
  loading: boolean = false;
  constructor(private insuranceServie: InsuranceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loading = true; 
    this.fetchData();
  }

  fetchData() {
    this.route.params.pipe(map(params => {
      const id = params['id'];
      return id;
    }), mergeMap(id => this.insuranceServie.getInsurance(id))).subscribe({next: (res) => {
      res.body != null ? this.insurance = res.body : 0;
      this.startDate = this.datepipe.transform(res.body?.startDate, "dd-MM-YYYY");
      this.endDate = this.datepipe.transform(res.body?.endDate, "dd-MM-YYYY");
      this.loading = false;
    }, error: (error) => {
      
      this.router.navigate(['/error'], {relativeTo: this.route, skipLocationChange: true})
    }});
  }


}
