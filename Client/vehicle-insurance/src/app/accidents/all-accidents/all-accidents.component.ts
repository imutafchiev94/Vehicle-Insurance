import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AccidentService } from '../../services/accident.service';
import { environment } from '../../../environments/environment';
import { Accident } from '../../models/Accident';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-accidents',
  templateUrl: './all-accidents.component.html',
  styleUrls: ['./all-accidents.component.css']
})
export class AllAccidentsComponent implements OnInit {

  data: string;
  allAccidents: any = [];
  accidents : Array<Accident> = [];
  datePipe: DatePipe = new DatePipe('en-US');
  loading: boolean = false;
  sortByDateAscending: boolean = true;
  allAccidentsImageUrl = environment.allAccidentsImageUrl;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private accidentService: AccidentService) { 
      const navigation = this.router.getCurrentNavigation();
      const state = navigation.extras.state as {data: string};
      state !== undefined ? this.data = state.data : this.data = "";
    }

  ngOnInit(): void {
    this.fetchDataAccidents();
    this.loading = true;
  }

  fetchDataAccidents() {
    this.accidentService.getAllAccidents().subscribe({
      next: (res) => {
        res != null ? this.allAccidents = res : 0;
        for (let i = 0; i < this.accidents.length; i++) {
          this.accidents[i].dateOfAccident = this.datePipe.transform(this.accidents[i].dateOfAccident, 'dd-MM-YYYY');
        }
        this.accidents = this.allAccidents.slice(0, 10);
        this.loading = false;
      }, error: (err) => {
      this.router.navigate(['/error'], {relativeTo: this.route, skipLocationChange: true})
      }
    })
  }

  sortByDate() {
    if(!this.sortByDateAscending) {
      this.sortByDateAscending = true;
      this.accidents.sort(function (a, b) {
        return a.dateOfAccident > b.dateOfAccident ? 1 : a.dateOfAccident < b.dateOfAccident ? -1 : 0
      })
  } else {
    this.sortByDateAscending = false;
      this.accidents.sort(function (a, b) {
        return b.dateOfAccident > a.dateOfAccident ? 1 : b.dateOfAccident < a.dateOfAccident ? -1 : 0
      })
  }
}

OnPageChange(event: PageEvent) {
  const startIndex = event.pageIndex * event.pageSize;
  let endIndex = startIndex + event.pageSize;
  if(endIndex > this.allAccidents.length) {
    endIndex = this.allAccidents.length;
  }

  this.accidents = this.allAccidents.slice(startIndex, endIndex);
}

}
