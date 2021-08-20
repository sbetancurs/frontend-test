import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  search: string = '';

  constructor(private _route: ActivatedRoute, private router: Router) {
    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');
    if (search) {
      this.search = search;
    }
  }

  ngOnInit(): void {}

  onItemChange(value: string) {
    this.search = value;
  }

  searchFor = (event) => {
    event.preventDefault();
    const queryParams: Params = { search: this.search };
    this.router.navigate([], {
      relativeTo: this._route,
      queryParams: queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  };
}
