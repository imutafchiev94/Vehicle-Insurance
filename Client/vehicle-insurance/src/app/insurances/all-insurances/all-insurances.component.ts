import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InsuranceService } from '../../services/insurance.service';
import { environment } from '../../../environments/environment';

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
  sortStartDateAscending: boolean = true;
  sortEndDateAscending: boolean = true;
  allInsurancesImageUrl = environment.allInsurancesImageUrl;
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

  sortByEndDate() {
    if(!this.sortEndDateAscending) {
      this.sortEndDateAscending = true;
      this.insurances.sort(function (a, b) {
        return a.endDate > b.endDate ? 1 : a.endDate < b.endDate ? -1 : 0
      })
      console.log(this.insurances);
  } else {
    this.sortEndDateAscending = false;
      this.insurances.sort(function (a, b) {
        return b.endDate > a.endDate ? 1 : b.endDate < a.endDate ? -1 : 0
      })
  }
}

sortByStartDate() {
  if(!this.sortStartDateAscending) {
    this.sortStartDateAscending = true;
    this.insurances.sort(function (a, b) {
      return a.startDate > b.startDate ? 1 : a.startDate < b.startDate ? -1 : 0
    })
    console.log(this.insurances);
} else {
  this.sortStartDateAscending = false;
    this.insurances.sort(function (a, b) {
      return b.startDate > a.startDate ? 1 : b.startDate < a.startDate ? -1 : 0
    })
}
}

}
