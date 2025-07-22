import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Season, SeasonCreateRequest } from '../models/season.model';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  private apiUrl = 'http://localhost:8080/api/seasons';

constructor(private http: HttpClient) { }

  getAllSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(this.apiUrl);
  }

  getSeasonById(id: string): Observable<Season> {
    return this.http.get<Season>(`${this.apiUrl}/${id}`);
  }

  createSeason(request: SeasonCreateRequest): Observable<Season> {
    return this.http.post<Season>(this.apiUrl, request);
  }


  updateSeason(id: string, event: SeasonCreateRequest): Observable<Season> {
    return this.http.put<Season>(`${this.apiUrl}/${id}`, event);
  }

  deleteSeason(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}