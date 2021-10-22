import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  headers = new HttpHeaders()
    .set(
      'Content-Type',
      'application/json'
    );

  constructor(
    private http: HttpClient
  ) { }

  getSearchData(searchString: string, start: number): Observable<any> {
    const url = 'http://localhost:4200/search';
    return this.http.get(url, {
      headers: this.headers,
      params: new HttpParams()
        .set('q', searchString)
        .set('start', start)
    });
  }

}
