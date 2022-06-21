import { Component, OnInit } from '@angular/core';
import {map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import { Home } from '../models/Home';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  headerImageUrl;
  loading: boolean = false;
  constructor(private homeService: HomeService,
    private route: ActivatedRoute,
    private router: Router) { 
    }
    
    ngOnInit(): void {
      this.loading = true;
      this.fetchData();
  }

  
  fetchData() {
   this.homeService.getDashboardImage().subscribe({next: (res) => {
      res != null ? this.headerImageUrl = res.imageUrl : 0;
      this.loading = false;
    }, error: (error) => {
      this.router.navigate(['/error'], {relativeTo: this.route, skipLocationChange: true})
    }});
  }

}
