import { Component } from '@angular/core';
import {Router,NavigationStart,NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private route: Router) {}
  
  isLoaded: boolean = false;

  ngOnInit()
{
this.route.events.subscribe(
event=>{
if(event instanceof NavigationStart)
{
console.log('navigation starts');
this.isLoaded=true;
}
else if(event instanceof NavigationEnd)
{
console.log('navigation ends');
this.isLoaded=false;
}
},
error=>{
this.isLoaded=false;
console.log(error);
})}
}
