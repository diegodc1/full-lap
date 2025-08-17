import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StandingsResponse } from '../models/standings.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {
  private apiUrl = `${environment.apiUrl}/standings`;

  constructor(private http: HttpClient) { }

  getStandingsByCategoryAndSeason(categoryName: string, seasonYear: number): Observable<StandingsResponse> {
    return this.http.get<StandingsResponse>(`${this.apiUrl}/${categoryName}/${seasonYear}`);
  }

  getDriverStandings(categoryName: string, seasonYear: number): Observable<StandingsResponse> {
    return this.http.get<StandingsResponse>(`${this.apiUrl}/drivers/${categoryName}/${seasonYear}`);
  }

  getTeamStandings(categoryName: string, seasonYear: number): Observable<StandingsResponse> {
    return this.http.get<StandingsResponse>(`${this.apiUrl}/teams/${categoryName}/${seasonYear}`);
  }
}