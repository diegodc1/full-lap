
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
    private apiUrl = `${environment.apiUrl}/news`;

  constructor(private http: HttpClient) { }

  getNewsByCategory(category: string, limit: number = 10): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/${category}?limit=${limit}`);
  }
}
