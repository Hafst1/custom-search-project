import { Component, HostListener, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { DashboardService } from './dashboard.service';

interface SearchResult {
  link: string;
  title: string;
  img: string
  imgThumbnail: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup;
  searchResults: SearchResult[];
  searchString: string;
  scrolling = false;
  isResult = false;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
  ) { }

  @HostListener('window:scroll')
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (!this.scrolling && this.isResult) {
        this.scrolling = true;
        setTimeout(function(){
          this.scrolling = false;
        }, 1000);
      }
      this.dashboardService.getSearchData(this.searchString, this.searchResults.length + 1).subscribe(data => {
        this.searchResults = this.searchResults.concat(data.items);
      })
    }
  }
  
  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.searchForm = this.fb.group({
      searchField: [null]
    })
  }

  getSearchResults(value: string): void {
    this.dashboardService.getSearchData(value, 1).subscribe(data => {
      const firstResults = data.items;
      this.searchString = data.q;
      this.isResult = true;
      this.dashboardService.getSearchData(value, firstResults.length + 1).subscribe(data => {
        this.searchResults = firstResults.concat(data.items);
      })
    }, err => {
      console.log(err);
    });
  }
}
