import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { API_PATH } from './api-links';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResolveService {
  private options: {};
  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders().set('Acephalous-Head', 'Acephalous'),
    };

  }

  getMainMenu(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + API_PATH.MAIN_MENU);
  }

  getNodes(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + API_PATH.NODES + '?_format=json');
  }

  getArticle(path: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/' + path + '?_format=json');
  }

  getImage(id: string, type: string): Observable<any> {
    if (type === 'node--article') {
      return this.http.get<any>(environment.apiUrl + API_PATH.NODES + '/' + id + '/field_image');
    }
  }

  getTags(id: string, type: string): Observable<any> {
    if (type === 'node--article') {
      return this.http.get<any>(environment.apiUrl + '/api/node/article/' + id + '/field_tags');
    }
  }

  getTag(url: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + url + '?_format=json');
  }

  getSiteInfo(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + API_PATH.SITE_INFO);
  }

  getRouteDetailsFromDrupal(url: string): Observable<any> {
    return this.http.get(environment.apiUrl + API_PATH.ROUTE_CHECK + '?path=/' + url);
  }

  getUser(url: string): Observable<any> {
    return this.http.get(environment.apiUrl + '/' + url + '?_format=json');
  }

}
