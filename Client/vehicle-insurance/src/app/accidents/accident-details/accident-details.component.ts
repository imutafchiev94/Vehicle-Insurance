import { Component, OnInit } from '@angular/core';
import { AccidentService } from '../../services/accident.service';
import { Accident } from '../../models/Accident';
import {map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-accident-details',
  templateUrl: './accident-details.component.html',
  styleUrls: ['./accident-details.component.css']
})
export class AccidentDetailsComponent implements OnInit {

  accident: Accident;
  accidentDate;
  startDate;
  endDate;
  datepipe: DatePipe = new DatePipe("en-US");
  loading: boolean = false;
  constructor(private accidentService: AccidentService,
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
    }), mergeMap(id => this.accidentService.getAccident(id))).subscribe({next: (res) => {
      res != null ? this.accident = res : 0;
      this.accidentDate = this.datepipe.transform(res?.dateOfAccident, "dd-MM-YYYY");
      // this.startDate = this.datepipe.transform(res?.insurance.startDate, "dd-MM-YYYY");
      // this.endDate = this.datepipe.transform(res?.insurance.endDate, "dd-MM-YYYY");
      this.loading = false;
    }, error: (error) => {
      this.router.navigate(['/error'], {relativeTo: this.route, skipLocationChange: true})
    }});
  }

}
