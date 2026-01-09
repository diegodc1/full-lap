import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { RaceAlertRequest } from '../models/race-alert-request';

@Injectable({
  providedIn: 'root'
})
export class RaceAlertService {
  private apiUrl = `${environment.apiUrl}/race-alerts`;

  constructor(private http: HttpClient) {}

  createAlert(alert : RaceAlertRequest): Observable<RaceAlertRequest> {
     return this.http.post<RaceAlertRequest>(this.apiUrl, alert);
  }
}
