import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CharacterService } from '@services/character.service';
import { ComicService } from '@services/comic.service';

import { Character } from '@models/character';
import { Comic } from '@models/comic';

import { forkJoin } from 'rxjs';

import { ModalService } from '../modal';
import { NotificationService } from '@services/index';
@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  offset: number = 0;
  limit: number = 10;
  totalPages: number = 0;
  currentPage: number = 1;
  search: string = '';
  orderBy: string = 'name';

  constructor(
    private client: CharacterService,
    private clientComic: ComicService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private modalService: ModalService,
    private notificationService: NotificationService
  ) {
    this.activeRoute.queryParams.subscribe((queryParams) => {
      const { search, orderBy, all } = queryParams;
      if (search || orderBy || search === '' || orderBy === '' || all) {
        this.currentPage = this.search === search ? this.currentPage : 1;
        this.offset = this.search === search ? this.offset : 0;
        this.search = search;
        this.orderBy = orderBy && orderBy !== '' ? orderBy : 'name';
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
        this.currentPage = this.totalPages > 0 ? this.currentPage : 0;
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

  openModal({ value, uri }) {
    this.modalService.open(value, uri);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  addRandomToFavs = () => {
    let i: number = 0;
    const comics: string[] = [];
    this.characters.forEach((x) => {
      if (i >= 3) {
        return;
      }

      x.comics.items.forEach((c: Comic) => {
        if (i >= 3) {
          return;
        }

        const favs = JSON.parse(localStorage.getItem('favs') || '[]');
        const comicId = Number(this.clientComic.getComicId(c.resourceURI));
        if (!favs.some((f) => f.id === comicId)) {
          i += 1;
          comics.push(c.resourceURI);
        }
      });
    });

    this.addSelectedToFavs(comics);
  };

  addSelectedToFavs = (comics: string[]) => {
    const comic1 = this.clientComic.getOne(comics[0]);
    const comic2 = this.clientComic.getOne(comics[1]);
    const comic3 = this.clientComic.getOne(comics[2]);
    const favs = JSON.parse(localStorage.getItem('favs') || '[]');
    forkJoin([comic1, comic2, comic3]).subscribe((data) => {
      data.forEach((x) => {
        const { id, title, thumbnail } =
          //@ts-ignore
          x.data.results[0] || ({} as Comic);

        favs.push({ id, title, thumbnail });
        localStorage.setItem('favs', JSON.stringify(favs));
        this.sendNotification();
      });
    });
  };

  sendNotification(): void {
    this.notificationService.sendNotification('Favs updated');
  }

  clearNotification(): void {
    this.notificationService.clearNotification();
  }
}
