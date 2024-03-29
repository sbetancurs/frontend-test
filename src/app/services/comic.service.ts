import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ApiResponse } from '@models/apiResponse';

const url = `${environment.api_url}`;
const ts = `${environment.ts}`;
const apiKey = `${environment.apiKey}`;
const hash = `${environment.hash}`;
@Injectable({
  providedIn: 'root',
})
export class ComicService {
  constructor(private http: HttpClient, private route: Router) {}

  public getOne(comicUri: string): Observable<ApiResponse> {
   
    const query = `ts=${ts}&apikey=${apiKey}&hash=${hash}&`;

    return this.http.get<ApiResponse>(
      `${url}/comics/${this.getComicId(comicUri)}?${query}`
    );
  }

  public getComicId(comicUri: string): string{
     const split = comicUri.split('/');
     return split[split.length - 1];
  }
}
