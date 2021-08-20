import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

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
export class CharacterService {
  constructor(private http: HttpClient, private route: Router) {}

  public getAll(
    offset: number,
    limit: number = 10,
    search: string = '',
    orderBy: string = ''
  ): Observable<ApiResponse> {
    let query = `${ts}&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}`;
    query += search !== '' ? `&nameStartsWith=${search.toLowerCase()}` : '';
    query += orderBy !== '' ? `&orderBy=${orderBy}` : '';

    return this.http.get<ApiResponse>(`${url}/characters?ts=${query}`);
  }
}
