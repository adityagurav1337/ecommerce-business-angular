import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Title } from "@angular/platform-browser";
import { ApiUrlService } from '../apiurl.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  constructor(private api: ApiService, private apiurl:ApiUrlService, private title: Title) {
  }

  ngOnInit(): void {   
    this.api.loadJsFile("assets/main.js");
  }

}
