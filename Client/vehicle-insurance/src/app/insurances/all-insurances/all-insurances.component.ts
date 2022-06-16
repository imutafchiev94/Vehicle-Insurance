import { Component, OnInit } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InsuranceService } from '../../services/insurance.service';
import { Insurance } from '../../models/Insurance';

@Component({
  selector: 'app-all-insurances',
  templateUrl: './all-insurances.component.html',
  styleUrls: ['./all-insurances.component.css']
})
export class AllInsurancesComponent implements OnInit {

  insurances;
  datePipe: DatePipe = new DatePipe('en-US');
  haveToPay: boolean = false;
  loading: boolean = false;
  sortAscending: boolean; 
  constructor(private route: ActivatedRoute,
    private router: Router,
    private insuranceService: InsuranceService) { }

  ngOnInit(): void {
    console.log("here");
    this.loading = true;
    this.fetchDataInsurance();
  }

  fetchDataInsurance() {
    this.insuranceService.getAllInsurances().subscribe({
      next: (res) => {
        console.log("here");
        res.body != null ? this.insurances = res.body : 0;
        for (let i = 0; i < this.insurances.length; i++) {
          this.insurances[i].startDate = this.datePipe.transform(this.insurances[i].startDate, 'dd-MM-YYYY');
          this.insurances[i].endDate = this.datePipe.transform(this.insurances[i].endDate, 'dd-MM-YYYY');
        }
        this.loading = false;
      }, error: (err) => {
        console.log(err);
      this.router.navigate(['/error'], {relativeTo: this.route, skipLocationChange: true})
      }
    })
  }

  sort() {
    if(!this.sortAscending) {
      this.sortAscending = true;
      this.insurances.sort(function (a, b) {
        return a - b;
      })
    }
  }

}
