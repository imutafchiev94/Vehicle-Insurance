import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InsuranceService } from '../../services/insurance.service';
import { environment } from '../../../environments/environment';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-all-insurances',
  templateUrl: './all-insurances.component.html',
  styleUrls: ['./all-insurances.component.css']
})
export class AllInsurancesComponent implements OnInit {

  insurances: any = [];
  data: string;
  allInsurances: any = [];
  datePipe: DatePipe = new DatePipe('en-US');
  haveToPay: boolean = false;
  loading: boolean = false;
  sortStartDateAscending: boolean = true;
  sortEndDateAscending: boolean = true;
  allInsurancesImageUrl = environment.allInsurancesImageUrl;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private insuranceService: InsuranceService) {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation.extras.state as {data: string};
      state !== undefined ? this.data = state.data : this.data = "";
     }

  ngOnInit(): void {

    this.loading = true;
    this.fetchDataInsurance();
  }

  fetchDataInsurance() {
    this.insuranceService.getAllInsurances().subscribe({
      next: (res) => {
        res != null ? this.allInsurances = res : 0;
        for (let i = 0; i < this.insurances.length; i++) {
          this.insurances[i].startDate = this.datePipe.transform(this.insurances[i].startDate, 'dd-MM-YYYY');
          this.insurances[i].endDate = this.datePipe.transform(this.insurances[i].endDate, 'dd-MM-YYYY');
        }
        this.insurances = this.allInsurances.slice(0, 10);
        this.loading = false;
      }, error: (err) => {
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
} else {
  this.sortStartDateAscending = false;
    this.insurances.sort(function (a, b) {
      return b.startDate > a.startDate ? 1 : b.startDate < a.startDate ? -1 : 0
    })
}
}

OnPageChange(event: PageEvent) {
  const startIndex = event.pageIndex * event.pageSize;
  let endIndex = startIndex + event.pageSize;
  if(endIndex > this.allInsurances.length) {
    endIndex = this.allInsurances.length;
  }

  this.insurances = this.allInsurances.slice(startIndex, endIndex);
}

}
