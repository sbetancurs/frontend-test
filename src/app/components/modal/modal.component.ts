import {
  Component,
  ViewEncapsulation,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ComicService } from '@services/comic.service';
import { ModalService } from './modal.service';
import { NotificationService } from '@services/index';

import { Comic } from '@models/comic';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  comicUri: string;
  comic: Comic;
  favs: Comic[] = [];
  isFav: boolean = false;
  initialValue = {
    id: 0,
    title: '',
    description: '',
    resourceURI: '',
    prices: [{ type: '', price: 3900 }],
    thumbnail: {
      path: '',
      extension: '',
    },
  };

  private element: any;

  constructor(
    private client: ComicService,
    private modalService: ModalService,
    private el: ElementRef,
    private notificationService: NotificationService
  ) {
    this.element = el.nativeElement;
    this.comic = this.initialValue;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    document.body.appendChild(this.element);

    this.element.addEventListener('click', (el) => {
      if (el.target.className === 'modal') {
        this.close();
      }
    });

    this.modalService.add(this);
  }

  getComicInfo = () => {
    this.client.getOne(this.comicUri).subscribe((response) => {
      //@ts-ignore
      const comic = response.data.results[0];
      this.comic = comic;
      this.favs = JSON.parse(localStorage.getItem('favs') || '[]');
      this.isFav = this.favs.some((x) => x.id === this.comic.id);
    });
  };

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.getComicInfo();
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
    this.isFav = false;
  }

  addComicToFavs = () => {
    const { id, title, thumbnail } = this.comic;
    const favs = JSON.parse(localStorage.getItem('favs') || '[]');

    if (!favs.some((x) => x.id === id)) {
      favs.push({ id, title, thumbnail });
      this.isFav = true;
      localStorage.setItem('favs', JSON.stringify(favs));
      this.sendNotification();
    }
  };

  sendNotification(): void {
    console.log('Favs updated');
    this.notificationService.sendNotification('Favs updated');
  }

  clearNotification(): void {
    this.notificationService.clearNotification();
  }
}
