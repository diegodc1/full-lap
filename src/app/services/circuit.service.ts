import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Circuit } from '../models/circuit.model';

@Injectable({
  providedIn: 'root'
})
export class CircuitService {
  private apiUrl = 'http://localhost:8080/api/circuits';

constructor(private http: HttpClient) { }

  getAllCircuits(): Observable<Circuit[]> {
    return this.http.get<Circuit[]>(this.apiUrl);
  }

  getCircuitById(id: string): Observable<Circuit> {
    return this.http.get<Circuit>(`${this.apiUrl}/${id}`);
  }

  createCircuit(event: Event): Observable<Circuit> {
    return this.http.post<Circuit>(this.apiUrl, event);
  }

  updateCircuit(id: string, event: Event): Observable<Circuit> {
    return this.http.put<Circuit>(`${this.apiUrl}/${id}`, event);
  }

  deleteCircuit(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}