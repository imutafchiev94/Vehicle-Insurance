import { Component, OnInit } from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {Owner} from '../../models/Owner';
import {map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit {

  id;
  owner;
  constructor(private ownerService: OwnerService,
    private route: ActivatedRoute) { 
      // this.fetchData()
      this.route.params.subscribe(res => {
        this.id = res['id'];
        this.ownerService.getOwner(this.id).subscribe(res => {
          this.owner = res;
          // console.log(res);
        })
      })

      console.log(this.owner);
    }

//TODO to read about map and mergeMap

   

  // fetchData() {
  //   this.route.params.pipe(map(params => {
  //     const id = params['id'];
  //     this.id = id;
  //     return this.id;
  //   }), mergeMap(id => this.ownerService.getOwner(id))).subscribe(res => {
  //     this.owner = res;
  //   })
  // }

  ngOnInit(): void {
  }



}
