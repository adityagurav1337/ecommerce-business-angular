import { Component } from '@angular/core';
import { ApiService } from './shared/api.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  show = false;
  constructor(public api:ApiService, private router: Router){    
    this.api.showspinner.subscribe((result:any)=>{
      this.show = result;
    });

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { /* Your code goes here on every router change */
      this.changeOfRoutes();
    }
    });
  }

  changeOfRoutes(){
    this.api.loadJsFile("assets/main.js");
  }
 
}
