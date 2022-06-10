import { Component, OnInit } from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {Owner} from '../../models/Owner';
import {map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
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
    private route: ActivatedRoute) { 
      this.fetchData()
    }  


  fetchData() {
    this.route.params.pipe(map(params => {
      const id = params['id'];
      return id;
    }), mergeMap(id => this.ownerService.getOwner(id))).subscribe(res => {
      this.owner = res;
      if(res.vehicles.length < 1) 
      {
        this.hasVehicles = false;
      }
      else {
        this.hasVehicles = true;
      }
      this.ownerDateOfBirth = this.datepipe.transform(res.dateOfBirth, "dd-MM-YYYY");
    })
  }


  ngOnInit(): void {
  }



}
