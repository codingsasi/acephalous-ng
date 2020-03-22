import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATH } from './api-links';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResolveService {

  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMainMenu(): Observable<any> {
    return this.http.get<any>(this.API_URL + API_PATH.MAIN_MENU);
  }

  getArticles(): Observable<any> {
    return this.http.get<any>(this.API_URL + API_PATH.ARTICLES);
  }

  getImage(id: string, type: string): Observable<any> {
    if (type === 'node--article') {
      return this.http.get<any>(this.API_URL + API_PATH.ARTICLES + '/' + id + '/field_image');
    }
  }

  getTags(id: string, type: string): Observable<any> {
    if (type === 'node--article') {
      return this.http.get<any>(this.API_URL + API_PATH.ARTICLES + '/' + id + '/field_tags');
    }
  }

  getSiteInfo(): Observable<any> {
    return this.http.get<any>(this.API_URL + API_PATH.SITE_INFO);
  }

  getUser(id: string, type: string): Observable<any> {
    if (type === 'node--article') {
      return this.http.get<any>(this.API_URL + API_PATH.ARTICLES + '/' + id + '/uid');
    }
  }
}
