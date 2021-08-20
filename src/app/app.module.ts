import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroeDetailsComponent } from './components/heroe-details/heroe-details.component';
import { HeroeCardComponent } from './components/heroe-card/heroe-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroeListComponent } from './components/heroe-list/heroe-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroeDetailsComponent,
    HeroeCardComponent,
    NavbarComponent,
    HeroeListComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
