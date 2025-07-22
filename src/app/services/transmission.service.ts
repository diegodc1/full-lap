import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transmission } from '../models/transmission.model';

@Injectable({
  providedIn: 'root'
})
export class TransmissionService {
  private apiUrl = 'http://localhost:8080/api/transmissions';

constructor(private http: HttpClient) { }

  getAllTransmissions(): Observable<Transmission[]> {
    return this.http.get<Transmission[]>(this.apiUrl);
  }

  getTransmissionById(id: string): Observable<Transmission> {
    return this.http.get<Transmission>(`${this.apiUrl}/${id}`);
  }

  createTransmission(event: Event): Observable<Transmission> {
    return this.http.post<Transmission>(this.apiUrl, event);
  }

  updateTransmission(id: string, event: Event): Observable<Transmission> {
    return this.http.put<Transmission>(`${this.apiUrl}/${id}`, event);
  }

  deleteTransmission(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}