// src/app/services/event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventsCalendar, RaceEvent, RaceEventRequest, RaceWeekEventRes } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<RaceEvent[]> {
    return this.http.get<RaceEvent[]>(this.apiUrl);
  }

  getEventById(id: string): Observable<RaceEvent> {
    return this.http.get<RaceEvent>(`${this.apiUrl}/${id}`);
  }

  getEventOfWeekByDate(dateInitial: string, dateFinal: string): Observable<RaceWeekEventRes[]> {
    return this.http.get<RaceWeekEventRes[]>(`${this.apiUrl}/week/${dateInitial}/${dateFinal}?details=false`);
  }

  getAllEventsPerWeekByDate(dateInitial: string, dateFinal: string): Observable<EventsCalendar[]> {
    return this.http.get<EventsCalendar[]>(`${this.apiUrl}/week/group/${dateInitial}/${dateFinal}`);
  }

  getAllByCategoryNameAndSeasonYear(categoryName: string, seasonYear: number): Observable<RaceEvent[]> {
    return this.http.get<RaceEvent[]>(`${this.apiUrl}/category/${categoryName}/${seasonYear}`);
  }

  createEvent(event: RaceEventRequest): Observable<RaceEvent> {
    return this.http.post<RaceEvent>(this.apiUrl, event);
  }

  updateEvent(id: string, event: RaceEventRequest): Observable<RaceEvent> {
    return this.http.put<RaceEvent>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}