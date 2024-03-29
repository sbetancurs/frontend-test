import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { ModalModule } from './components/modal/';
import { FavouritesListComponent } from './components/favourites-list/favourites-list.component';
import { NotificationService } from './services/index';

@NgModule({
  declarations: [
    AppComponent,
    CharacterCardComponent,
    NavbarComponent,
    CharacterListComponent,
    FavouritesListComponent,
  ],
  imports: [BrowserModule, HttpClientModule, ModalModule, AppRoutingModule],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/home' },
    NotificationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
