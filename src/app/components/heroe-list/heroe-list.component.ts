import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CharacterService } from '@services/character.service';

import { Character } from '@models/character';

import { ModalService } from '../modal';
@Component({
  selector: 'app-heroe-list',
  templateUrl: './heroe-list.component.html',
  styleUrls: ['./heroe-list.component.scss'],
})
export class HeroeListComponent implements OnInit {
  characters: Character[];
  offset: number = 0;
  limit: number = 10;
  totalPages: number = 0;
  currentPage: number = 1;
  search: string = '';
  orderBy: string = '';

  constructor(
    private client: CharacterService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private modalService: ModalService
  ) {
    this.activeRoute.queryParams.subscribe((queryParams) => {
      const { search, orderBy, all } = queryParams;
      if (search || orderBy || search === '' || orderBy === '' || all) {
        this.currentPage = this.search === search ? this.currentPage : 1;
        this.offset = this.search === search ? this.offset : 0;
        this.search = search;
        this.orderBy = orderBy;
        this.getCharacters();
      }
    });
  }

  onSelectedItemChange(value: string) {
    const queryParams: Params = { orderBy: value };
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {
    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');
    const orderBy = url.searchParams.get('orderBy');

    if (!search && !orderBy) {
      this.getCharacters();
    }
  }

  getCharacters = () => {
    this.client
      .getAll(this.offset, this.limit, this.search, this.orderBy)
      .subscribe((response) => {
        this.characters = response.data.results;
        this.totalPages = Math.ceil(response.data.total / this.limit);
      });
  };

  getNextPage = (direction: string) => {
    if (direction === 'prev') {
      this.offset -= 10;
      this.currentPage -= 1;
    } else {
      this.offset += 10;
      this.currentPage += 1;
    }

    this.getCharacters();
  };

  getCurrentPage = (index: number) => {
    this.offset = index * 10 - 10;
    this.currentPage = index;

    this.getCharacters();
  };

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
