import { Component, OnInit } from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {Owner} from '../../models/Owner';
import {map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit {


  owner: Owner;
  ownerDateOfBirth;
  hasVehicles: Boolean;
  datepipe: DatePipe = new DatePipe("en-US");
  constructor(private ownerService: OwnerService,
    private route: ActivatedRoute,
    private router: Router) { 
      this.fetchData()
    }  


  fetchData() {
    this.route.params.pipe(map(params => {
      const id = params['id'];
      return id;
    }), mergeMap(id => this.ownerService.getOwner(id))).subscribe({next: (res) => {
      res.body != null ? this.owner = res.body : 0;
      if(this.owner.vehicles.length < 1) 
      {
        this.hasVehicles = false;
      }
      else {
        this.hasVehicles = true;
      }
      this.ownerDateOfBirth = this.datepipe.transform(res.body?.dateOfBirth, "dd-MM-YYYY");
    }, error: (error) => {
      this.router.navigate(['/error'], {relativeTo: this.route, skipLocationChange: true})
    }});
  }


  ngOnInit(): void {
  }



}
