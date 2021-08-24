import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotificationService } from '@services/index';

@Component({
  selector: 'app-favourites-list',
  templateUrl: './favourites-list.component.html',
  styleUrls: ['./favourites-list.component.scss'],
})
export class FavouritesListComponent implements OnInit {
  notification: any;
  subscription: Subscription;
  favs: [];

  constructor(private notificationService: NotificationService) {
    this.favs = JSON.parse(localStorage.getItem('favs') || '[]');
    this.subscription = this.notificationService
      .getNotification()
      .subscribe((notification) => {
        this.notification = notification;
        this.favs = JSON.parse(localStorage.getItem('favs') || '[]');
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeFav = (event, id: string) => {
    event.preventDefault();
    const favs = JSON.parse(localStorage.getItem('favs') || '[]');
    const newFavs = favs.filter((x) => x.id !== id);
    localStorage.setItem('favs', JSON.stringify(newFavs));
    this.favs = JSON.parse(localStorage.getItem('favs') || '[]');
  };
}
