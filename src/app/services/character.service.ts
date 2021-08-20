import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ApiResponse } from '@models/apiResponse';

const url = `${environment.api_url}`;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  ts: string = '1';
  apiKey: string = '6bb9854020fa7555d8c6c1545351a182';
  hash: string = '89f470afb7abf62cda7ccfd454067a8d';

  constructor(private http: HttpClient, private route: Router) {}

  public getAll(
    offset: number,
    limit: number = 10,
    search: string = '',
    orderBy: string = ''
  ): Observable<ApiResponse> {
    let query = `${this.ts}&apikey=${this.apiKey}&hash=${this.hash}&limit=${limit}&offset=${offset}`;
    query += search !== '' ? `&nameStartsWith=${search.toLowerCase()}` : '';
    query += orderBy !== '' ? `&orderBy=${orderBy}` : '';

    return this.http.get<ApiResponse>(`${url}/characters?ts=${query}`);
  }
}
